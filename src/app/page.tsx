import { FaLinkedin, FaMedium, FaGithubSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import TiltAvatar from "./components/TiltAvatar";
import config from '../data/config.json';

const socialLinkClass =
  "inline-block transition-transform duration-200 hover:-translate-y-1";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto] min-h-screen mx-auto gap-3 md:max-w-screen-lg">
      <main className="p-2 flex flex-col justify-center">
        <TiltAvatar src="/img/profile.jpg" alt={config.name} />
        <h1 className="text-3xl md:text-5xl font-bold text-center justify-center mx-auto pt-5 font-serif">
          <strong>{config.name}</strong>
        </h1>
        <p className="text-center mx-auto max-w-[32em] pt-5">
          {config.intro}
        </p>
        <ul className="flex space-x-1 text-5xl justify-center mx-auto pt-5">
          <li>
            <a
              className={socialLinkClass}
              href={config.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in new tab)">
              <FaLinkedin className="scale-75" />
            </a>
          </li>
          <li>
            <a
              className={socialLinkClass}
              href={config.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in new tab)">
              <FaGithubSquare className="scale-75" />
            </a>
          </li>
          <li>
            <a
              className={socialLinkClass}
              href={config.social.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter (opens in new tab)">
              <FaSquareXTwitter className="scale-75" />
            </a>
          </li>
          <li>
            <a
              className={socialLinkClass}
              href={config.social.medium}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium (opens in new tab)">
              <FaMedium className="scale-75" />
            </a>
          </li>
          <li>
            <a
              className={socialLinkClass}
              href={config.social.email}
              aria-label="Email">
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
