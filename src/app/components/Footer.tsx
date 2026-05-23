import { FaGithub } from "react-icons/fa";
import config from '../../data/config.json';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-1 pb-6 pt-8 text-sm text-gray-600">
      <p className="text-center">
        {config.name} © {new Date().getFullYear()} ·{" "}
        <a
          className="hover:underline hover:underline-offset-4 decoration-dashed"
          href={config.fork}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Source on GitHub (opens in new tab)"
        >
          <FaGithub aria-hidden="true" className="inline-block align-[-2px]" /> Source
        </a>
      </p>
      <p className="text-xs text-gray-500 text-center">
        Built on the{" "}
        <a
          className="hover:underline"
          href="https://github.com/sandeepraju/pesto"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pesto
        </a>{" "}
        theme.
      </p>
    </footer>
  );
}
