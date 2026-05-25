import type { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';
import PageShell from "../components/PageShell";
import config from '../../data/config.json';
import { getBlurDataURL } from "../../lib/blur";

export const metadata: Metadata = {
  title: "About",
  description: `About ${config.name}: software developer, culinary artist, lifelong pesto enthusiast.`,
};

export default function About() {
  return (
    <PageShell>
      <div className="max-w-[65ch] mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold font-serif pb-2 text-center">About</h1>
        <p className="text-center text-muted mb-10">
          Software developer · Culinary artist · Brooklyn, NY
        </p>

        <figure className="mb-12 mx-auto max-w-[600px]">
          <div className="p-4 bg-surface border border-border rounded-lg shadow-lg transition-transform duration-200 hover:-translate-y-1">
            <Image
              src="/img/giovanni-pasta.jpeg"
              alt=""
              width={600}
              height={400}
              priority
              sizes="(max-width: 640px) 100vw, 600px"
              className="rounded w-full h-auto"
              placeholder={getBlurDataURL("/img/giovanni-pasta.jpeg") ? "blur" : "empty"}
              blurDataURL={getBlurDataURL("/img/giovanni-pasta.jpeg")}
            />
          </div>
          <figcaption className="text-center text-muted mt-3 text-sm font-medium">Doing what I do best 🍝</figcaption>
        </figure>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">The short version</h2>
          <p className="mb-4">
            I&apos;m a software developer who treats the kitchen like a second IDE. By day I&apos;m deep in code; by evening I&apos;m chopping basil. Both come down to the same thing — taking simple ingredients and turning them into something more than the sum of their parts.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">What I do</h2>
          <p className="mb-4">
            Most of my work sits between web infrastructure and the products people actually use — APIs, design systems, the connective tissue. I care about software that reads well, deploys cleanly, and doesn&apos;t embarrass itself on a slow connection.
          </p>
          <p className="mb-4">
            Lately I&apos;ve been building <em>Pesto Bot</em>, an AI kitchen assistant for people who, like me, can&apos;t stop putting basil in things. See the{" "}
            <Link href="/projects" className="underline underline-offset-4 decoration-dashed hover:decoration-solid">Projects</Link> page for the rest.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">What I cook</h2>
          <p className="mb-4">
            Pesto, obviously. There&apos;s always a jar in my fridge. Basil, garlic, olive oil, pine nuts, parmesan — it&apos;s a five-ingredient symphony, and it goes on more things than people think. (Pro tip: scrambled eggs.)
          </p>
          <p className="mb-4">
            Beyond pesto: a lot of pasta from scratch, sourdough on weekends, and a slowly improving relationship with pizza dough hydration.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">What else</h2>
          <p className="mb-4">
            I lift four mornings a week — it keeps me honest and earns the carbs. The other thing I lose evenings to is film: noir, indie, action-blockbuster, doesn&apos;t matter, if it&apos;s well-shot I&apos;m in. Frequent culprits behind &quot;just one more episode.&quot;
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Say hello</h2>
          <p className="mb-4">
            If you want to talk about code, cuisine, or both —{" "}
            <a
              href={config.social.email}
              className="text-accent-strong underline underline-offset-4 decoration-dashed hover:decoration-solid font-medium"
            >
              hello@gpestocchi.com
            </a>.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
