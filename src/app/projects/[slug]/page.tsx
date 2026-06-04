import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import PageShell from "../../components/PageShell";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getAdjacentProjects,
} from "../../../lib/projects";
import { getBlurDataURL } from "../../../lib/blur";
import { cardSurface, tagPill } from "../../../lib/styles";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl md:text-3xl font-bold font-serif mt-10 mb-3" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold font-serif mt-6 mb-2" {...props} />
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
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
};

export default async function ProjectCaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <PageShell>
      <article className="max-w-[65ch] mx-auto pb-12">
        <header className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 py-1 text-sm text-muted-strong hover:underline underline-offset-4 decoration-dashed mb-6"
          >
            <span aria-hidden="true">←</span> All projects
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-3">{project.title}</h1>
          <p className="text-lg text-muted-strong">{project.description}</p>
        </header>

        {project.image && (() => {
          const blurDataURL = getBlurDataURL(project.image);
          return (
            <figure className="mb-10 -mx-2 md:-mx-6">
              <div className="relative w-full overflow-hidden rounded-lg border border-border shadow-lg aspect-16/10">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                  placeholder={blurDataURL ? "blur" : "empty"}
                  blurDataURL={blurDataURL}
                  style={{ viewTransitionName: `project-image-${project.slug}` }}
                />
              </div>
            </figure>
          );
        })()}

        <dl className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-sm">
          <div>
            <dt className="uppercase tracking-wider text-xs text-muted mb-1">Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-wider text-xs text-muted mb-1">Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-wider text-xs text-muted mb-1">Tech</dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <li key={t} className={tagPill}>
                    {t}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        {project.url && project.url !== "#" && (
          <p className="mb-10">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-surface-muted text-foreground font-medium transition-transform duration-200 hover:-translate-y-0.5"
              aria-label={`View ${project.title} on GitHub (opens in new tab)`}
            >
              {project.url.includes("github.com")
                ? <><FaGithub aria-hidden="true" /> View on GitHub</>
                : <><FiExternalLink aria-hidden="true" /> Visit project</>}
            </a>
          </p>
        )}

        <div className="text-base md:text-lg">
          <MDXRemote source={project.body} components={mdxComponents} />
        </div>
      </article>

      {(prev || next) && (
        <nav className="max-w-[65ch] mx-auto pb-12" aria-label="Project navigation">
          <ul className={`grid gap-4 ${prev && next ? "md:grid-cols-2" : "grid-cols-1"}`}>
            {prev && (
              <li>
                <Link
                  href={`/projects/${prev.slug}`}
                  className={`group p-4 ${cardSurface}`}
                >
                  <p className="text-xs uppercase tracking-wider text-muted mb-1">← Previous</p>
                  <p className="font-serif font-bold text-foreground group-hover:text-muted-strong">{prev.title}</p>
                </Link>
              </li>
            )}
            {next && (
              <li>
                <Link
                  href={`/projects/${next.slug}`}
                  className={`group p-4 ${cardSurface} ${prev ? "text-right" : ""}`}
                >
                  <p className="text-xs uppercase tracking-wider text-muted mb-1">Next →</p>
                  <p className="font-serif font-bold text-foreground group-hover:text-muted-strong">{next.title}</p>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </PageShell>
  );
}
