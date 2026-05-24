import type { Metadata } from "next";
import Link from 'next/link';
import PageShell from "../components/PageShell";
import config from '../../data/config.json';
import { getAllPosts, getAllTags, formatPostDate, slugifyTag, type PostMeta } from "../../lib/blog";
import { cardSurface, tagPill } from "../../lib/styles";

export const metadata: Metadata = {
  title: "Blog",
  description: `Writing by ${config.name} on software development, cooking, fitness, and the spaces in between.`,
};

function PostMeta({ post }: { post: PostMeta }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
      <time dateTime={new Date(post.date).toISOString()}>{formatPostDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readingMinutes} min read</span>
      {post.tags.length > 0 && (
        <>
          <span aria-hidden="true">·</span>
          <ul className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li key={tag} className={tagPill}>{tag}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function Blog() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const [featured, ...rest] = posts;

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

      {/* Featured: the most recent post, rendered larger */}
      {featured && (
        <article className={`group max-w-[50em] mx-auto mb-12 p-6 md:p-10 ${cardSurface}`}>
          <Link
            href={`/blog/${featured.slug}`}
            className="block"
            aria-label={`${featured.title} — ${featured.description}`}
          >
            <div className="flex flex-col space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-accent-strong font-semibold">
                Latest
              </p>
              <h2 className="text-2xl md:text-4xl font-bold font-serif leading-tight text-foreground group-hover:text-muted-strong transition-colors duration-200">
                {featured.title}
              </h2>
              <PostMeta post={featured} />
              <p className="text-base md:text-lg text-muted-strong">
                {featured.description}
              </p>
              <div className="inline-flex items-center gap-1 text-foreground text-sm md:text-base font-semibold mt-2 transition-transform duration-200 group-hover:translate-x-1">
                Read the post
                <span aria-hidden="true">→</span>
              </div>
            </div>
          </Link>
        </article>
      )}

      {rest.length > 0 && (
        <div className="max-w-[50em] mx-auto">
          <h2 className="text-xs uppercase tracking-[0.18em] text-muted font-semibold mb-4 text-center md:text-left">
            More writing
          </h2>
          {rest.map((post) => (
            <article key={post.slug} className={`group mb-6 p-6 ${cardSurface}`}>
              <Link
                href={`/blog/${post.slug}`}
                className="block"
                aria-label={`${post.title} — ${post.description}`}
              >
                <div className="flex flex-col space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-foreground group-hover:text-muted-strong transition-colors duration-200">
                    {post.title}
                  </h3>
                  <PostMeta post={post} />
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
      )}
    </PageShell>
  );
}
