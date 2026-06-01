import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "../../../components/PageShell";
import {
  formatPostDate,
  getAllTags,
  getPostsByTag,
  slugifyTag,
  unslugifyTag,
} from "../../../../lib/blog";
import { cardSurface, tagPill } from "../../../../lib/styles";

type Params = { tag: string };

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: slugifyTag(tag) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = unslugifyTag(slug);
  if (!tag) return { title: "Tag not found" };
  return {
    title: `#${tag}`,
    description: `Posts tagged "${tag}".`,
  };
}

const stretchedLinkClass =
  "static after:absolute after:inset-0 after:content-[''] focus:outline-hidden";

export default async function TagPage({ params }: { params: Promise<Params> }) {
  const { tag: slug } = await params;
  const tag = unslugifyTag(slug);
  if (!tag) notFound();

  const posts = getPostsByTag(tag);

  return (
    <PageShell>
      <header className="text-center pb-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 py-1 text-sm text-muted-strong hover:underline underline-offset-4 decoration-dashed mb-4"
        >
          <span aria-hidden="true">←</span> All posts
        </Link>
        <p className="text-sm uppercase tracking-[0.18em] text-accent-strong font-medium mb-2">
          Tag
        </p>
        <h1 className="text-3xl md:text-4xl font-bold font-serif pb-2">#{tag}</h1>
        <p className="text-muted">
          {posts.length} post{posts.length === 1 ? "" : "s"} tagged <strong className="font-semibold">{tag}</strong>.
        </p>
      </header>

      <div className="max-w-[50em] mx-auto">
        {posts.map((post) => (
          <article key={post.slug} className={`group relative mb-8 p-6 ${cardSurface}`}>
            <div className="flex flex-col space-y-2">
              <h2 className="text-xl md:text-2xl font-bold font-serif text-foreground group-hover:text-muted-strong transition-colors duration-200">
                <Link href={`/blog/${post.slug}`} className={stretchedLinkClass}>
                  {post.title}
                </Link>
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                <time dateTime={new Date(post.date).toISOString()}>{formatPostDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min read</span>
                {post.tags.length > 0 && (
                  <>
                    <span aria-hidden="true">·</span>
                    <ul className="flex flex-wrap gap-1.5 relative z-20">
                      {post.tags.map((t) => (
                        <li key={t}>
                          <Link
                            href={`/blog/tags/${slugifyTag(t)}`}
                            className={`${tagPill} hover:underline underline-offset-4 decoration-dashed`}
                            aria-label={`See posts tagged ${t}`}
                          >
                            {t}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <p className="text-muted-strong">{post.description}</p>
              <div className="inline-flex items-center gap-1 text-foreground text-sm font-semibold transition-transform duration-200 group-hover:translate-x-1">
                Read more
                <span aria-hidden="true">→</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
