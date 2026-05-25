import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import PageShell from "../../components/PageShell";
import NewsletterSignup from "../../components/NewsletterSignup";
import config from "../../../data/config.json";
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  formatPostDate,
  slugifyTag,
} from "../../../lib/blog";
import { cardSurface, tagPill } from "../../../lib/styles";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: new Date(post.date).toISOString(),
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl md:text-3xl font-bold font-serif mt-12 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold font-serif mt-8 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-foreground leading-relaxed mb-5" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="underline underline-offset-4 decoration-dashed hover:decoration-solid" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-5 space-y-2 marker:text-muted" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-5 space-y-2 marker:text-muted" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li {...props} />,
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-border pl-4 italic text-muted-strong my-6" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="px-1.5 py-0.5 rounded bg-surface-muted text-foreground text-[0.9em] font-mono" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="p-4 my-6 rounded-lg bg-surface-muted border border-border overflow-x-auto text-sm font-mono leading-relaxed" {...props} />
  ),
  hr: () => <hr className="my-10 border-border" />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => <strong className="font-semibold text-foreground" {...props} />,
  em: (props: React.HTMLAttributes<HTMLElement>) => <em className="italic" {...props} />,
};

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 2);

  const siteUrl = config.siteUrl.replace(/\/+$/, "");
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const isoDate = new Date(post.date).toISOString();
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: isoDate,
    dateModified: isoDate,
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      name: config.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: config.name,
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    url: postUrl,
    image: `${siteUrl}/img/profile.jpg`,
    inLanguage: "en",
    wordCount: post.body.trim().split(/\s+/).length,
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <article className="max-w-[65ch] mx-auto pb-16">
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted mb-3">
            <time dateTime={new Date(post.date).toISOString()}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-4">{post.title}</h1>
          <p className="text-lg text-muted-strong">{post.description}</p>
          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5 mt-5" aria-label="Tags">
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
          )}
        </header>

        <div className="text-base md:text-lg">
          <MDXRemote source={post.body} components={mdxComponents} />
        </div>

        <footer className="mt-16 pt-8 border-t border-border">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 py-1 text-sm font-semibold hover:underline underline-offset-4 decoration-dashed"
          >
            <span aria-hidden="true">←</span> All posts
          </Link>
        </footer>
      </article>

      {related.length > 0 && (
        <aside className="max-w-[65ch] mx-auto pb-12" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-sm uppercase tracking-wider text-muted font-semibold mb-4">
            Keep reading
          </h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/blog/${r.slug}`}
                  className={`group p-4 ${cardSurface}`}
                >
                  <p className="text-xs text-muted mb-1">{formatPostDate(r.date)} · {r.readingMinutes} min</p>
                  <p className="font-serif font-bold text-foreground group-hover:text-muted-strong leading-snug">{r.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="pb-12">
        <NewsletterSignup variant="card" />
      </div>
    </PageShell>
  );
}
