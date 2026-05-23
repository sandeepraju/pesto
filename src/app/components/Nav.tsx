import Link from 'next/link';
import { GrDocumentPdf } from "react-icons/gr";
import { LuFilePenLine, LuSquareUserRound } from "react-icons/lu";
import { GoCodeSquare } from "react-icons/go";

const linkClass =
  "inline-flex items-center gap-2 transition-transform duration-200 hover:underline hover:underline-offset-4 decoration-dashed hover:-translate-y-1";

export default function Nav() {
    return (
        <ul className="flex flex-col md:flex-row md:space-x-8 items-center justify-center mx-auto pt-5 text-lg">
          <li className="p-2">
            <Link className={linkClass} href="/about">
              <LuSquareUserRound aria-hidden="true" /> About
            </Link>
          </li>
          <li className="p-2">
            <Link className={linkClass} href="/projects">
              <GoCodeSquare aria-hidden="true" /> Projects
            </Link>
          </li>
          <li className="p-2">
            <a
              className={linkClass}
              href="/doc/Giovanni-Pestocchi-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer">
              <GrDocumentPdf aria-hidden="true" className="text-current" /> Resume
            </a>
          </li>
          <li className="p-2">
            <Link className={linkClass} href="/blog">
              <LuFilePenLine aria-hidden="true" /> Blog
            </Link>
          </li>
        </ul>
    );
}
