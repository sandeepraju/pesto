import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import { Container, Section, Stack } from "../components/primitives";
import config from "../../data/config.json";

export const metadata: Metadata = {
  title: "Uses",
  description: `Hardware, software, and kitchen tools ${config.name} actually uses every day.`,
};

type Item = { name: string; note?: string };
type Section = { heading: string; items: Item[] };

const sections: Section[] = [
  {
    heading: "Editor",
    items: [
      { name: "VS Code", note: "with Vim mode, the Stripe theme, and one extension I refuse to live without (Error Lens)" },
      { name: "Geist Mono", note: "in the editor" },
      { name: "iTerm2 + zsh", note: "starship prompt" },
    ],
  },
  {
    heading: "Hardware",
    items: [
      { name: "MacBook Pro 14\"", note: "M3 Pro, 36GB" },
      { name: "Studio Display", note: "external monitor" },
      { name: "Keychron K3 Pro", note: "low-profile, brown switches" },
      { name: "Apple Magic Trackpad", note: "I've given up on mice" },
      { name: "AirPods Pro", note: "for everything" },
    ],
  },
  {
    heading: "Software I'd pay for again tomorrow",
    items: [
      { name: "Linear", note: "for personal task tracking too" },
      { name: "1Password", note: "obvious" },
      { name: "Cleanshot X", note: "screenshots that actually look intentional" },
      { name: "Raycast", note: "Spotlight replacement; the calculator alone is worth it" },
      { name: "Things 3", note: "the only to-do app I've ever stuck with" },
    ],
  },
  {
    heading: "Browser",
    items: [
      { name: "Arc", note: "primary" },
      { name: "Safari", note: "secondary, for when Arc is being Arc" },
    ],
  },
  {
    heading: "Build tools",
    items: [
      { name: "Next.js + Tailwind", note: "this site" },
      { name: "Bun", note: "increasingly, for scripts" },
      { name: "GitHub Actions", note: "for CI" },
    ],
  },
  {
    heading: "Kitchen",
    items: [
      { name: "Vitamix 5200", note: "the pesto blender" },
      { name: "Lodge cast-iron 12\"", note: "the everything pan" },
      { name: "OXO digital scale", note: "the most-used tool in the kitchen" },
      { name: "Microplane", note: "for parmesan, garlic, citrus zest" },
      { name: "A cheap Wüsthof 8\" chef's knife", note: "sharpened often, replaced rarely" },
    ],
  },
  {
    heading: "Gym",
    items: [
      { name: "Garmin Venu Sq", note: "HRV + sleep tracking" },
      { name: "Hampton chalk", note: "I will die on this hill" },
    ],
  },
];

export default function Uses() {
  return (
    <PageShell>
      <Container as="article" size="prose" className="pb-16">
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-2">Uses</h1>
          <p className="text-muted-strong">
            The hardware, software, and kitchen tools I actually reach for. No affiliate links, no sponsored picks — just what&apos;s on the desk, the counter, and the gym bag.
          </p>
        </header>

        <Stack gap="lg">
          {sections.map((section) => (
            <Section key={section.heading} spacing="none">
              <h2 className="text-xl font-bold font-serif mb-3">{section.heading}</h2>
              <Stack as="ul" gap="sm">
                {section.items.map((item) => (
                  <li key={item.name} className="leading-relaxed">
                    <strong className="text-foreground font-semibold">{item.name}</strong>
                    {item.note && <span className="text-muted-strong"> — {item.note}</span>}
                  </li>
                ))}
              </Stack>
            </Section>
          ))}
        </Stack>
      </Container>
    </PageShell>
  );
}
