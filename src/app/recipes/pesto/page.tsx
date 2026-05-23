import type { Metadata } from "next";
import PageShell from "../../components/PageShell";

export const metadata: Metadata = {
  title: "Pesto recipe",
  description: "The pesto recipe my data wants me to make. Specific enough to act on, loose enough to forgive.",
  openGraph: {
    type: "article",
    title: "Pesto recipe",
    description: "Classic Genovese, with less garlic than the internet wants you to use.",
  },
};

export default function PestoRecipe() {
  return (
    <PageShell>
      <article className="max-w-[60ch] mx-auto pb-16">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-[0.18em] text-accent-strong font-medium mb-2">Recipe</p>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-3">Pesto Genovese</h1>
          <p className="text-lg text-muted-strong">
            The pesto recipe my data wants me to make. Specific enough to act on, loose enough to forgive. Less garlic than the internet wants you to use.
          </p>
          <p className="text-sm text-muted mt-3">Serves 4 over pasta · 10 minutes · No cooking required</p>
        </header>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-serif mb-4">Ingredients</h2>
          <ul className="space-y-2 list-disc pl-6 marker:text-accent">
            <li><strong>2 cups</strong> fresh basil leaves, packed, dried thoroughly</li>
            <li><strong>1/3 cup</strong> pine nuts</li>
            <li><strong>1/2 clove</strong> garlic, blanched 30 seconds</li>
            <li><strong>1/2 cup</strong> parmesan, freshly grated</li>
            <li><strong>1/2 cup</strong> olive oil — the best you can justify</li>
            <li><strong>Salt</strong>, applied iteratively</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-serif mb-4">Method</h2>
          <ol className="space-y-4 list-decimal pl-6 marker:text-accent">
            <li className="leading-relaxed">
              <strong>Toast the pine nuts.</strong> Dry pan, medium-low heat, four minutes, gold not amber. Gold scores +1.5 over amber on every metric I can measure. Cool them.
            </li>
            <li className="leading-relaxed">
              <strong>Blanch the garlic.</strong> 30 seconds in boiling water. Drain. This kills the raw-garlic edge that 90% of internet pesto recipes lean too hard into.
            </li>
            <li className="leading-relaxed">
              <strong>Combine in a blender.</strong> Basil, cooled pine nuts, blanched garlic, parmesan, a pinch of salt, half the oil. Pulse — don&apos;t run it continuously, you&apos;ll cook the basil with friction heat.
            </li>
            <li className="leading-relaxed">
              <strong>Scrape down.</strong> Add the remaining oil. Pulse to combine.
            </li>
            <li className="leading-relaxed">
              <strong>Taste.</strong> More salt? More oil? Maybe both. Pulse one more time and stop.
            </li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold font-serif mb-3">Notes</h2>
          <ul className="space-y-3 list-disc pl-6 marker:text-accent">
            <li className="leading-relaxed">
              <strong>Oil quality matters more than oil quantity.</strong> Single-estate olive oil adds ~2 points on every metric. Half a cup is enough; don&apos;t drown it.
            </li>
            <li className="leading-relaxed">
              <strong>Dry the basil.</strong> Wet basil makes wet pesto, and wet pesto is grey within an hour. Spin or pat the leaves bone-dry first.
            </li>
            <li className="leading-relaxed">
              <strong>Texture beats homogeneity.</strong> Visible green-and-cream marbling scores +1.2 vs fully puréed. Stop pulsing before the colour goes flat.
            </li>
            <li className="leading-relaxed">
              <strong>Storage.</strong> Top with a thin layer of olive oil, refrigerate. Good for a week. Freezes well in ice-cube trays.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold font-serif mb-3">Serve it with</h2>
          <p className="leading-relaxed">
            Trofie, linguine, or fusilli — anything with crevices to catch the sauce. Bring the pasta water&apos;s starch into the pesto when you toss; the emulsion is the magic.
          </p>
          <p className="leading-relaxed mt-3">
            Leftovers go in eggs. <em>Pro tip:</em> stir a spoonful into scrambled eggs in the last 30 seconds. Game-changer.
          </p>
        </section>
      </article>
    </PageShell>
  );
}
