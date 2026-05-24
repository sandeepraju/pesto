import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import { Container, Section, Stack } from "../components/primitives";
import config from "../../data/config.json";

export const metadata: Metadata = {
  title: "Now",
  description: `What ${config.name} is doing right now — current focus, current reading, current kitchen experiments.`,
};

const updated = "May 22, 2026";

const entries: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Building",
    body: (
      <p className="leading-relaxed">
        <strong>Pesto Bot</strong> — week six. It now generates a recipe and three pairings from a single ingredient list. The next milestone is letting it remember what you already tried last time.
      </p>
    ),
  },
  {
    heading: "Writing",
    body: (
      <p className="leading-relaxed">
        A post about the difference between cooking recipes and writing them — they require different mental muscles, and I think most published cookbooks miss this.
      </p>
    ),
  },
  {
    heading: "Reading",
    body: (
      <ul className="list-disc pl-6 space-y-1 marker:text-accent">
        <li><em>The Food Lab</em> — Kenji López-Alt. Re-read.</li>
        <li><em>A Pattern Language</em> — Alexander, Ishikawa, Silverstein.</li>
        <li><em>Klara and the Sun</em> — Kazuo Ishiguro. Bedside book.</li>
      </ul>
    ),
  },
  {
    heading: "Cooking",
    body: (
      <p className="leading-relaxed">
        Pistachio pesto every weekend until I can do it without measuring. Currently 60% of the way there.
      </p>
    ),
  },
  {
    heading: "Training",
    body: (
      <p className="leading-relaxed">
        Four lifts a week — Mon, Tue, Thu, Fri. Pull / push / lower / accessory. Slowly working back toward a 2× bodyweight deadlift.
      </p>
    ),
  },
  {
    heading: "Watching",
    body: (
      <p className="leading-relaxed">
        Just finished <em>Severance</em> S2. Started <em>Slow Horses</em> from the top. Always a Wong Kar-wai rewatch open in another tab.
      </p>
    ),
  },
];

export default function Now() {
  return (
    <PageShell>
      <Container as="article" size="prose" className="pb-16">
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-2">Now</h1>
          <p className="text-sm text-muted">
            What I&apos;m focused on right now. Updated periodically — last refresh{" "}
            <time>{updated}</time>.
          </p>
        </header>

        <Stack gap="lg">
          {entries.map(({ heading, body }) => (
            <Section key={heading} spacing="none">
              <h2 className="text-xl font-bold font-serif mb-2">{heading}</h2>
              {body}
            </Section>
          ))}
        </Stack>
      </Container>
    </PageShell>
  );
}
