import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "../components/PageShell";
import config from "../../data/config.json";

export const metadata: Metadata = {
  title: "Colophon",
  description: `The design system, typography, and tech behind ${config.name}'s site.`,
};

export default function Colophon() {
  return (
    <PageShell>
      <article className="max-w-[60ch] mx-auto pb-16">
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-2">Colophon</h1>
          <p className="text-muted-strong">
            How the site is built. The decisions, the tools, the trade-offs.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-serif mb-3">Typography</h2>
          <p className="leading-relaxed mb-3">
            Body and UI in <strong>Geist</strong> by Vercel — a clean neo-grotesque with optical balance that&apos;s hard to fault. Headlines in <strong>Fraunces</strong> by Undercase Type, loaded with the <code className="text-sm bg-surface-muted px-1.5 py-0.5 rounded">opsz</code> and <code className="text-sm bg-surface-muted px-1.5 py-0.5 rounded">SOFT</code> variable axes for warmer, editorial-grade display sizes.
          </p>
          <p className="leading-relaxed">
            Monospace in <strong>Geist Mono</strong>, with ligatures off.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-serif mb-3">Colour</h2>
          <p className="leading-relaxed mb-4">
            Neutrals carry the contrast budget; one accent — basil green, the brand colour — appears subtly in tag pills, the avatar ring, focus moments. Background is warm paper (<code className="text-sm bg-surface-muted px-1.5 py-0.5 rounded">#fbfaf7</code>), not pure white. Dark mode follows <code className="text-sm bg-surface-muted px-1.5 py-0.5 rounded">prefers-color-scheme</code>.
          </p>
          <ul className="flex flex-wrap gap-3">
            {[
              { name: "Foreground", swatch: "bg-foreground" },
              { name: "Background", swatch: "bg-background border border-border" },
              { name: "Surface muted", swatch: "bg-surface-muted" },
              { name: "Basil accent", swatch: "bg-accent" },
              { name: "Pine accent", swatch: "bg-accent-strong" },
              { name: "Young basil", swatch: "bg-accent-soft" },
            ].map((c) => (
              <li key={c.name} className="flex items-center gap-2 text-sm">
                <span className={`w-5 h-5 rounded ${c.swatch}`} aria-hidden="true"></span>
                <span>{c.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-serif mb-3">Stack</h2>
          <ul className="list-disc pl-6 space-y-1 marker:text-accent">
            <li><strong>Next.js</strong> (App Router, static export)</li>
            <li><strong>Tailwind CSS</strong> with CSS-variable semantic tokens</li>
            <li><strong>MDX</strong> via <code className="text-sm bg-surface-muted px-1.5 py-0.5 rounded">next-mdx-remote/rsc</code> for blog posts and project case studies</li>
            <li><strong>TypeScript</strong> across the board</li>
            <li>Deployed as plain static HTML — no runtime, no API</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-serif mb-3">Accessibility</h2>
          <p className="leading-relaxed">
            Every interactive element has a visible <code className="text-sm bg-surface-muted px-1.5 py-0.5 rounded">:focus-visible</code> ring. A skip-to-content link is the first tab stop on every route. Motion respects <code className="text-sm bg-surface-muted px-1.5 py-0.5 rounded">prefers-reduced-motion</code> — translates, lifts, and the parallax avatar all turn off when the OS asks. Body text targets WCAG AA contrast; tap targets meet the 24×24 minimum (most exceed it).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-serif mb-3">Performance</h2>
          <p className="leading-relaxed">
            Site is a fully static export. Blog and project pages prerender at build time. Only the home page avatar is a client island (for the subtle parallax); everything else is Server Components. <code className="text-sm bg-surface-muted px-1.5 py-0.5 rounded">priority</code> is reserved for above-the-fold imagery only.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-serif mb-3">Process</h2>
          <p className="leading-relaxed">
            Built in public. The redesign that produced this version is documented post-by-post in the{" "}
            <Link href="/blog" className="underline underline-offset-4 decoration-dashed hover:decoration-solid">blog</Link>, and the full audit lives at{" "}
            <a
              href={`${config.fork}/blob/main/docs/ux-audit.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-dashed hover:decoration-solid"
            >
              docs/ux-audit.md
            </a>{" "}
            in the repo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold font-serif mb-3">Source</h2>
          <p className="leading-relaxed">
            The site is open source on{" "}
            <a
              href={config.fork}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-dashed hover:decoration-solid"
            >
              GitHub
            </a>{" "}
            and originally based on the <em>Pesto</em> template by <a href="https://github.com/sandeepraju" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-dashed hover:decoration-solid">sandeepraju</a>.
          </p>
        </section>
      </article>
    </PageShell>
  );
}
