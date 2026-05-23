// Render everything client side as this is a static-site.
'use client'

import Image from "next/image";
import { FaLinkedin, FaMedium, FaGithubSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Tilt from 'react-parallax-tilt';
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import config from '../data/config.json';

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto] min-h-screen mx-auto gap-3 md:max-w-screen-lg">
      <main className="p-2 flex flex-col justify-center">
        <Tilt className="block mx-auto h-auto">
          <Image
            className="rounded-full border-8 border-[#f8f9fa] shadow-xl block mx-auto h-auto"
            src="/img/profile.jpg"
            alt={config.name}
            width={300}
            height={300}
            priority
          />
        </Tilt>
        <h1 className="text-3xl md:text-5xl font-bold text-center justify-center mx-auto pt-5 font-serif"><strong>{config.name}</strong></h1>
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
        <Nav />
      </main>
      <Footer />
    </div>
  );
}
