import { FaLinkedin, FaMedium, FaGithubSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import TiltAvatar from "./components/TiltAvatar";
import config from '../data/config.json';

const socialLinkClass =
  "inline-flex items-center justify-center p-2 transition-transform duration-200 hover:-translate-y-1";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto] min-h-screen mx-auto gap-3 md:max-w-screen-lg">
      <main id="main" className="p-2 flex flex-col justify-center">
        {/* Identity: photo + name + intro are one visual group */}
        <TiltAvatar src="/img/profile.jpg" alt={config.name} size={240} />
        <h1 className="text-3xl md:text-5xl font-bold text-center mx-auto mt-6 font-serif">
          {config.name}
        </h1>
        <p className="text-center mx-auto max-w-[32em] mt-3 text-muted-strong">
          {config.intro}
        </p>

        {/* Wayfinding: social + nav are a second, distinct group */}
        <ul className="flex gap-4 text-4xl justify-center mx-auto mt-10" aria-label="Social links">
          <li>
            <a className={socialLinkClass} href={config.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in new tab)">
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a className={socialLinkClass} href={config.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in new tab)">
              <FaGithubSquare />
            </a>
          </li>
          <li>
            <a className={socialLinkClass} href={config.social.x} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter (opens in new tab)">
              <FaSquareXTwitter />
            </a>
          </li>
          <li>
            <a className={socialLinkClass} href={config.social.medium} target="_blank" rel="noopener noreferrer" aria-label="Medium (opens in new tab)">
              <FaMedium />
            </a>
          </li>
          <li>
            <a className={socialLinkClass} href={config.social.email} aria-label="Email">
              <MdOutlineAlternateEmail />
            </a>
          </li>
        </ul>
        <Nav />
      </main>
      <Footer />
    </div>
  );
}
