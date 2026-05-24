import type { Metadata } from "next";
import Link from 'next/link';
import PageShell from "../components/PageShell";
import config from '../../data/config.json';
import { getAllPosts, getAllTags, formatPostDate, slugifyTag } from "../../lib/blog";
import { cardSurface, tagPill } from "../../lib/styles";

export const metadata: Metadata = {
  title: "Blog",
  description: `Writing by ${config.name} on software development, cooking, fitness, and the spaces in between.`,
};

export default function Blog() {
  const posts = getAllPosts();
  const tags = getAllTags();
  return (
    <PageShell>
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-center mx-auto pb-2">Blog</h1>
        <p className="text-center text-muted mx-auto max-w-[40em] pb-6">
          Notes on software, cooking, and what happens when you mix the two.
        </p>
        {tags.length > 0 && (
          <nav aria-label="Filter by tag" className="max-w-[50em] mx-auto pb-10">
            <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm">
              <li className="text-muted uppercase tracking-[0.15em] text-xs font-medium">Browse by tag:</li>
              {tags.map(({ tag, count }) => (
                <li key={tag}>
                  <Link
                    href={`/blog/tags/${slugifyTag(tag)}`}
                    className={`${tagPill} hover:underline underline-offset-4 decoration-dashed`}
                  >
                    {tag} <span className="text-accent-strong/70">({count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="max-w-[50em] mx-auto">
          {posts.map((post) => (
            <article key={post.slug} className={`group mb-8 p-6 ${cardSurface}`}>
              <Link
                href={`/blog/${post.slug}`}
                className="block"
                aria-label={`${post.title} — ${post.description}`}
              >
                <div className="flex flex-col space-y-2">
                  <h2 className="text-xl md:text-2xl font-bold font-serif text-foreground group-hover:text-muted-strong transition-colors duration-200">
                    {post.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                    <time dateTime={new Date(post.date).toISOString()}>{formatPostDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingMinutes} min read</span>
                    {post.tags.length > 0 && (
                      <>
                        <span aria-hidden="true">·</span>
                        <ul className="flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <li key={tag} className={tagPill}>
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                  <p className="text-muted-strong mt-2">{post.description}</p>
                  <div className="inline-flex items-center gap-1 text-foreground text-sm font-semibold mt-2 transition-transform duration-200 group-hover:translate-x-1">
                    Read more
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
    </PageShell>
  );
}
