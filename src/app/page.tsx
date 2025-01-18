// Render everything client side as this is a static-site.
'use client'

import Image from "next/image";
import { FaGithub, FaLinkedin, FaMedium, FaGithubSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { GrDocumentPdf } from "react-icons/gr";
import { LuFilePenLine, LuSquareUserRound } from "react-icons/lu";
import { GoCodeSquare } from "react-icons/go";
import Tilt from 'react-parallax-tilt';

import config from '../data/config.json';

export default function Home() {
  return (
    <div className="grid grid-rows-[4em_auto_4em] min-h-screen mx-auto gap-3">
      <header className="flex items-center justify-center">
      </header>
      <main className="p-2">
        <Tilt className="block mx-auto h-auto">
          <Image
            className="rounded-full border-8 border-[#f8f9fa] shadow-xl block mx-auto h-auto"
            src="/profile.jpg"
            alt={config.name}
            width={300}
            height={300}
            priority
          />
        </Tilt>
        <h1 className="text-3xl md:text-5xl font-bold text-center justify-center mx-auto pt-5">{config.name}</h1>
        <p className="text-center mx-auto max-w-[32em] pt-5">
          {config.intro}
        </p>
        <ul className="flex space-x-1 text-5xl justify-center mx-auto pt-5">
          <li>
            <a
              className="inline-block transition-transform duration-200 hover:-translate-y-1"
              href={config.social.linkedin}
              target="_blank"
              rel="noopener noreferrer">
              <FaLinkedin className="scale-75" />
            </a>
          </li>
          <li>
            <a
              className="inline-block transition-transform duration-200 hover:-translate-y-1"
              href={config.social.github}
              target="_blank"
              rel="noopener noreferrer">
              <FaGithubSquare className="scale-75" />
            </a>
          </li>
          <li>
            <a
              className="inline-block transition-transform duration-200 hover:-translate-y-1"
              href={config.social.x}
              target="_blank"
              rel="noopener noreferrer">
              <FaSquareXTwitter className="scale-75" />
            </a>
          </li>
          <li>
            <a
              className="inline-block transition-transform duration-200 hover:-translate-y-1"
              href={config.social.medium}
              target="_blank"
              rel="noopener noreferrer">
              <FaMedium className="scale-75" />
            </a>
          </li>
          <li>
            <a
              className="inline-block transition-transform duration-200 hover:-translate-y-1"
              href={config.social.email}
              target="_blank"
              rel="noopener noreferrer">
              <MdOutlineAlternateEmail className="scale-75" />
            </a>
          </li>
        </ul>
        <ul className="flex flex-row space-x-8 justify-center mx-auto pt-5 text-lg">
          <li>
            <a
              className="inline-block transition-transform duration-200 hover:underline hover:underline-offset-4 decoration-dashed hover:-translate-y-1"
              href="/about"
              target="_self"
              rel="noopener noreferrer">
              <LuSquareUserRound className="inline-block scale-100 relative -top-[3px]" /> About
            </a>
          </li>
          <li>
            <a
              className="inline-block transition-transform duration-200 hover:underline hover:underline-offset-4 decoration-dashed hover:-translate-y-1"
              href="/projects"
              target="_self"
              rel="noopener noreferrer">
              <GoCodeSquare className="inline-block scale-100 relative -top-[3px]" /> Projects
            </a>
          </li>
          <li>
            <a
              className="inline-block transition-transform duration-200 hover:underline hover:underline-offset-4 decoration-dashed hover:-translate-y-1"
              href="/Giovanni-Pestocchi-Resume.pdf"
              target="_self"
              rel="noopener noreferrer">
              <GrDocumentPdf className="inline-block scale-100 relative -top-[3px]" /> Resume
            </a>
          </li>
          <li>
            <a
              className="inline-block transition-transform duration-200 hover:underline hover:underline-offset-4 decoration-dashed hover:-translate-y-1"
              href="/projects"
              target="_self"
              rel="noopener noreferrer">
              <LuFilePenLine className="inline-block scale-100 relative -top-[3px]" /> Blog
            </a>
          </li>
        </ul>
      </main>
      <footer className="flex flex-col items-center justify-center">
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
          {config.name} © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
