import type { Metadata } from "next";
import Link from 'next/link';
import PageShell from "../components/PageShell";
import config from '../../data/config.json';
import { getAllPosts, formatPostDate } from "../../lib/blog";

export const metadata: Metadata = {
  title: `Blog — ${config.name}`,
  description: `Writing by ${config.name} on software development, cooking, fitness, and the spaces in between.`,
};

export default function Blog() {
  const posts = getAllPosts();
  return (
    <PageShell>
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-center mx-auto pb-2">Blog</h1>
        <p className="text-center text-muted mx-auto max-w-[40em] pb-12">
          Notes on software, cooking, and what happens when you mix the two.
        </p>
        <div className="max-w-[50em] mx-auto">
          {posts.map((post) => (
            <article key={post.slug} className="group mb-8 p-6 bg-surface border border-border rounded-lg shadow-lg transform transition-transform duration-200 hover:-translate-y-1">
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
                            <li key={tag} className="px-2 py-0.5 text-xs rounded-full bg-accent-soft text-accent-strong">
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
