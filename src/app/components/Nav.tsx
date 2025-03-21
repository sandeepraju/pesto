import Link from 'next/link';
import { GrDocumentPdf } from "react-icons/gr";
import { LuFilePenLine, LuSquareUserRound } from "react-icons/lu";
import { GoCodeSquare } from "react-icons/go";

export default function Nav() {
    return (
        <ul className="flex flex-col md:flex-row md:space-x-8 items-center justify-center mx-auto pt-5 text-lg">
          <li className="p-2">
            <Link
              className="inline-block transition-transform duration-200 hover:underline hover:underline-offset-4 decoration-dashed hover:-translate-y-1"
              href="/about">
              <LuSquareUserRound className="inline-block scale-100 relative -top-[3px]" /> About
            </Link>
          </li>
          <li className="p-2">
            <Link
              className="inline-block transition-transform duration-200 hover:underline hover:underline-offset-4 decoration-dashed hover:-translate-y-1"
              href="/projects">
              <GoCodeSquare className="inline-block scale-100 relative -top-[3px]" /> Projects
            </Link>
          </li>
          <li className="p-2">
            <a
              className="inline-block transition-transform duration-200 hover:underline hover:underline-offset-4 decoration-dashed hover:-translate-y-1"
              href="/doc/Giovanni-Pestocchi-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer">
              <GrDocumentPdf className="inline-block scale-100 relative -top-[3px]" /> Resume
            </a>
          </li>
          <li className="p-2">
            <Link
              className="inline-block transition-transform duration-200 hover:underline hover:underline-offset-4 decoration-dashed hover:-translate-y-1"
              href="/blog">
              <LuFilePenLine className="inline-block scale-100 relative -top-[3px]" /> Blog
            </Link>
          </li>
        </ul>
    );
} 