import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import config from '../../data/config.json';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-3 pb-6 pt-10 text-sm text-muted-strong">
      <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
        <li>
          <Link href="/now" className="hover:underline hover:underline-offset-4 decoration-dashed">Now</Link>
        </li>
        <li>
          <Link href="/uses" className="hover:underline hover:underline-offset-4 decoration-dashed">Uses</Link>
        </li>
        <li>
          <Link href="/colophon" className="hover:underline hover:underline-offset-4 decoration-dashed">Colophon</Link>
        </li>
        <li>
          <Link href="/recipes/pesto" className="hover:underline hover:underline-offset-4 decoration-dashed">Pesto recipe</Link>
        </li>
      </ul>
      <p className="text-center text-muted">
        {config.name} © {new Date().getFullYear()} ·{" "}
        <a
          className="hover:underline hover:underline-offset-4 decoration-dashed"
          href={config.fork}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Source on GitHub (opens in new tab)"
        >
          <FaGithub aria-hidden="true" className="inline-block align-[-2px]" /> Source
        </a>{" "}
        ·{" "}
        <Link href="/colophon" className="hover:underline hover:underline-offset-4 decoration-dashed">
          Built on the Pesto theme
        </Link>
      </p>
    </footer>
  );
}
