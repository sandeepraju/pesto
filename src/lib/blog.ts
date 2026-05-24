import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "src", "content", "blog");

export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingMinutes: number;
};

export type Post = PostMeta & {
  body: string;
};

function readPostFile(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const frontmatter = data as Partial<PostFrontmatter>;

  return {
    slug,
    title: frontmatter.title ?? slug,
    description: frontmatter.description ?? "",
    date: typeof frontmatter.date === "string" ? frontmatter.date : new Date(frontmatter.date as unknown as string).toISOString().slice(0, 10),
    tags: frontmatter.tags ?? [],
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
    body: content,
  };
}

function listSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return listSlugs()
    .map((slug) => readPostFile(slug))
    .map((post) => {
      const { body, ...meta } = post;
      void body;
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    return readPostFile(slug);
  } catch {
    return null;
  }
}

export function getAllSlugs(): string[] {
  return listSlugs();
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => (b.count - a.count) || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function slugifyTag(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function unslugifyTag(slug: string): string | null {
  const all = getAllTags();
  const match = all.find((t) => slugifyTag(t.tag) === slug);
  return match ? match.tag : null;
}

export function getRelatedPosts(slug: string, limit = 2): PostMeta[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.filter((p) => p.slug !== slug).slice(0, limit);

  const scored = all
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const shared = p.tags.filter((t) => current.tags.includes(t)).length;
      return { post: p, score: shared };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.post);
}

export function formatPostDate(input: string): string {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
