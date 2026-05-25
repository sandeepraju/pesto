import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "./components/PageShell";

export const metadata: Metadata = {
  title: "404",
  description: "That page wandered out of the pantry.",
};

export default function NotFound() {
  return (
    <PageShell mainClassName="px-4 py-2 w-full flex flex-col items-center justify-center text-center">
        <p className="font-serif text-6xl md:text-8xl font-bold mb-4">404</p>
        <h1 className="text-xl md:text-2xl font-bold mb-3">
          That page wandered out of the pantry.
        </h1>
        <p className="text-muted-strong max-w-[40em] mb-8">
          The link you followed didn&apos;t lead anywhere on this site. Try one of these instead:
        </p>
        <ul className="flex flex-col md:flex-row md:gap-6 gap-3 items-center">
          <li>
            <Link
              className="inline-block transition-transform duration-200 hover:underline hover:underline-offset-4 decoration-dashed hover:-translate-y-1"
              href="/projects"
            >
              → See projects
            </Link>
          </li>
          <li>
            <Link
              className="inline-block transition-transform duration-200 hover:underline hover:underline-offset-4 decoration-dashed hover:-translate-y-1"
              href="/blog"
            >
              → Read the blog
            </Link>
          </li>
          <li>
            <Link
              className="inline-block transition-transform duration-200 hover:underline hover:underline-offset-4 decoration-dashed hover:-translate-y-1"
              href="/"
            >
              → Back to home
            </Link>
          </li>
        </ul>
    </PageShell>
  );
}
