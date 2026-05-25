import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "src", "content", "projects");

export type ProjectFrontmatter = {
  title: string;
  description: string;
  image: string;
  portrait: boolean;
  year: number;
  role: string;
  tech: string[];
  url: string;
  order: number;
};

export type ProjectMeta = ProjectFrontmatter & {
  slug: string;
};

export type Project = ProjectMeta & {
  body: string;
};

function readProjectFile(slug: string): Project {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as Partial<ProjectFrontmatter>;
  return {
    slug,
    title: frontmatter.title ?? slug,
    description: frontmatter.description ?? "",
    image: frontmatter.image ?? "",
    portrait: frontmatter.portrait ?? false,
    year: frontmatter.year ?? new Date().getFullYear(),
    role: frontmatter.role ?? "",
    tech: frontmatter.tech ?? [],
    url: frontmatter.url ?? "#",
    order: frontmatter.order ?? 999,
    body: content,
  };
}

function listSlugs(): string[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

export function getAllProjects(): ProjectMeta[] {
  return listSlugs()
    .map((slug) => readProjectFile(slug))
    .map((project) => {
      const { body, ...meta } = project;
      void body;
      return meta;
    })
    .sort((a, b) => a.order - b.order);
}

export function getAllProjectSlugs(): string[] {
  return listSlugs();
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    return readProjectFile(slug);
  } catch {
    return null;
  }
}

export function getAdjacentProjects(slug: string): {
  prev: ProjectMeta | null;
  next: ProjectMeta | null;
} {
  const all = getAllProjects();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i < all.length - 1 ? all[i + 1] : null,
  };
}
