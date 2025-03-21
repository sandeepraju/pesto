import { FaGithub } from "react-icons/fa";
import config from '../../data/config.json';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center pb-4">
      <p className="text-xs justify-center text-center mx-auto">
        Based on <a
          className="hover:underline"
          href="https://github.com/sandeepraju/pesto"
          target="_blank"
          rel="noopener noreferrer"
        >Pesto theme</a> by <a
          className="hover:underline"
          href="https://github.com/sandeepraju"
          target="_blank"
          rel="noopener noreferrer"><FaGithub className="inline-block" /> sandeepraju</a>
      </p>
      <p className="text-xs justify-center text-center mx-auto">
        Powered by <a
          className="hover:underline"
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >Next.js</a>, and published on <a
          className="hover:underline"
          href={config.fork}
          target="_blank"
          rel="noopener noreferrer"
        >Github</a>
      </p>
      <p className="text-xs justify-center text-center mx-auto">
        Coded with <a
          className="hover:underline"
          href="https://cursor.sh"
          target="_blank"
          rel="noopener noreferrer"
        >Cursor (The AI Code Editor)</a>
      </p>
      <p className="text-xs justify-center text-center mx-auto mt-2">
        {config.name} © {new Date().getFullYear()}
      </p>
    </footer>
  );
} 