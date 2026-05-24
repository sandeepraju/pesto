import Link from 'next/link';
import { GrDocumentPdf } from "react-icons/gr";
import { LuFilePenLine, LuSquareUserRound, LuCircleDot } from "react-icons/lu";
import { GoCodeSquare } from "react-icons/go";

const linkClass =
  "inline-flex items-center gap-2 px-2 py-2 transition-transform duration-200 hover:underline hover:underline-offset-4 decoration-dashed hover:-translate-y-1";

// Icons add editorial polish on desktop but make a compact mobile row
// crowded. Hide them below md to keep the nav on one line at 375px.
const iconClass = "hidden md:inline-block";

export default function Nav() {
    return (
        <ul className="flex flex-row flex-wrap gap-x-3 gap-y-1 md:gap-x-4 items-center justify-center mx-auto pt-2 md:pt-4 text-base md:text-lg">
          <li>
            <Link className={linkClass} href="/about">
              <LuSquareUserRound aria-hidden="true" className={iconClass} /> About
            </Link>
          </li>
          <li>
            <Link className={linkClass} href="/projects">
              <GoCodeSquare aria-hidden="true" className={iconClass} /> Projects
            </Link>
          </li>
          <li>
            <Link className={linkClass} href="/blog">
              <LuFilePenLine aria-hidden="true" className={iconClass} /> Blog
            </Link>
          </li>
          <li>
            <Link className={linkClass} href="/now">
              <LuCircleDot aria-hidden="true" className={iconClass} /> Now
            </Link>
          </li>
          <li>
            <a
              className={linkClass}
              href="/doc/Giovanni-Pestocchi-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer">
              <GrDocumentPdf aria-hidden="true" className={`${iconClass} text-current`} /> Resume
            </a>
          </li>
        </ul>
    );
}
