import type { Metadata } from "next";
import Link from 'next/link';
import PageShell from "../components/PageShell";
import NewsletterSignup from "../components/NewsletterSignup";
import config from '../../data/config.json';
import { getAllPosts, formatPostDate, slugifyTag, type PostMeta } from "../../lib/blog";
import { cardSurface, tagPill } from "../../lib/styles";

export const metadata: Metadata = {
  title: "Blog",
  description: `Writing by ${config.name} on software development, cooking, fitness, and the spaces in between.`,
};

/**
 * Post-meta row: date · reading time · clickable tag chips.
 *
 * The chips are real links to /blog/tags/<slug>; they sit on a higher
 * z-index than the stretched card link, so clicking a chip navigates to
 * the tag page rather than the post.
 */
function PostMetaRow({ post }: { post: PostMeta }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
      <time dateTime={new Date(post.date).toISOString()}>{formatPostDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readingMinutes} min read</span>
      {post.tags.length > 0 && (
        <>
          <span aria-hidden="true">·</span>
          <ul className="flex flex-wrap gap-1.5 relative z-20">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/blog/tags/${slugifyTag(tag)}`}
                  className={`${tagPill} hover:underline underline-offset-4 decoration-dashed`}
                  aria-label={`See posts tagged ${tag}`}
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/**
 * Card with a stretched ::after link: the whole surface is clickable
 * to the post, but child elements with z-index > 0 (the tag chips)
 * intercept their own clicks. Standard 'card with internal links'
 * pattern that keeps valid HTML (no nested <a>).
 */
const stretchedLinkClass =
  "static after:absolute after:inset-0 after:content-[''] focus:outline-hidden";

export default function Blog() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <PageShell>
      <h1 className="text-3xl md:text-4xl font-bold font-serif text-center mx-auto pb-2">Blog</h1>
      <p className="text-center text-muted mx-auto max-w-[40em] pb-12">
        Notes on software, cooking, and what happens when you mix the two.
      </p>

      {/* Featured: the most recent post, rendered larger */}
      {featured && (
        <article className={`group relative max-w-[50em] mx-auto mb-12 p-6 md:p-10 ${cardSurface}`}>
          <div className="flex flex-col space-y-3">
            <p className="text-xs uppercase tracking-[0.18em] text-accent-strong font-semibold">
              Latest
            </p>
            <h2 className="text-2xl md:text-4xl font-bold font-serif leading-tight text-foreground group-hover:text-muted-strong transition-colors duration-200">
              <Link href={`/blog/${featured.slug}`} className={stretchedLinkClass}>
                {featured.title}
              </Link>
            </h2>
            <PostMetaRow post={featured} />
            <p className="text-base md:text-lg text-muted-strong">
              {featured.description}
            </p>
            <div className="inline-flex items-center gap-1 text-foreground text-sm md:text-base font-semibold transition-transform duration-200 group-hover:translate-x-1">
              Read the post
              <span aria-hidden="true">→</span>
            </div>
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <div className="max-w-[50em] mx-auto">
          <h2 className="text-xs uppercase tracking-[0.18em] text-muted font-semibold mb-4 text-center md:text-left">
            More writing
          </h2>
          {rest.map((post) => (
            <article key={post.slug} className={`reveal group relative mb-6 p-6 ${cardSurface}`}>
              <div className="flex flex-col space-y-2">
                <h3 className="text-xl md:text-2xl font-bold font-serif text-foreground group-hover:text-muted-strong transition-colors duration-200">
                  <Link href={`/blog/${post.slug}`} className={stretchedLinkClass}>
                    {post.title}
                  </Link>
                </h3>
                <PostMetaRow post={post} />
                <p className="text-muted-strong">{post.description}</p>
                <div className="inline-flex items-center gap-1 text-foreground text-sm font-semibold transition-transform duration-200 group-hover:translate-x-1">
                  Read more
                  <span aria-hidden="true">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-12">
        <NewsletterSignup variant="card" />
      </div>
    </PageShell>
  );
}
