import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaMedium, FaGithubSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import TiltAvatar from "./components/TiltAvatar";
import config from '../data/config.json';
import { getAllProjects } from "../lib/projects";
import { getAllPosts, formatPostDate } from "../lib/blog";
import { getBlurDataURL } from "../lib/blur";
import { cardSurface } from "../lib/styles";

const socialLinkClass =
  "inline-flex items-center justify-center p-2 text-2xl transition-transform duration-200 hover:-translate-y-1";

export default function Home() {
  const featuredProjects = getAllProjects().slice(0, 3);
  const recentPosts = getAllPosts().slice(0, 2);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] grid-rows-[1fr_auto] min-h-screen mx-auto gap-3 w-full md:max-w-(--breakpoint-lg) px-4">
      <main id="main" className="py-10 md:py-16">
        {/* Hero: two-column on md+, stacked on mobile */}
        <section className="grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-12 items-center mb-20 md:mb-28">
          <div className="order-2 md:order-1 text-center md:text-left">
            <p className="text-sm md:text-base uppercase tracking-[0.18em] text-accent-strong font-medium mb-3">
              Software developer · Culinary artist
            </p>
            <h1 className="font-serif font-bold leading-[1.05] text-5xl md:text-6xl lg:text-7xl mb-5">
              {config.name}
            </h1>
            <p className="text-lg md:text-xl text-muted-strong max-w-[34em] md:max-w-none mx-auto md:mx-0 mb-5 leading-relaxed">
              {config.intro}
            </p>
            <p className="text-sm text-muted mb-8">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent align-middle mr-2" aria-hidden="true"></span>
              Currently building{" "}
              <Link
                href="/projects/pesto-bot"
                className="text-foreground font-semibold underline underline-offset-4 decoration-dashed hover:decoration-solid"
              >
                Pesto Bot
              </Link>
              , an AI kitchen assistant.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-foreground text-background font-semibold transition-transform duration-200 hover:-translate-y-0.5"
              >
                See projects <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md border border-border bg-surface text-foreground font-semibold transition-transform duration-200 hover:-translate-y-0.5"
              >
                Read writing
              </Link>
            </div>

            <ul className="flex flex-wrap gap-2 justify-center md:justify-start" aria-label="Social links">
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
          </div>

          <div className="order-1 md:order-2 mx-auto md:mx-0 md:justify-self-end">
            <TiltAvatar src="/img/profile.jpg" alt={config.name} size={300} blurDataURL={getBlurDataURL("/img/profile.jpg")} />
          </div>
        </section>

        {/* Selected work */}
        <section className="mb-20 md:mb-24" aria-labelledby="selected-work-heading">
          <header className="flex items-baseline justify-between mb-6">
            <h2 id="selected-work-heading" className="font-serif font-bold text-2xl md:text-3xl">Selected work</h2>
            <Link
              href="/projects"
              className="inline-block py-1 text-sm font-semibold underline underline-offset-4 decoration-dashed hover:decoration-solid"
            >
              See all →
            </Link>
          </header>
          <ul className="grid gap-4 md:grid-cols-3">
            {featuredProjects.map((p) => (
              <li key={p.slug} className="reveal">
                <Link
                  href={`/projects/${p.slug}`}
                  className={`group overflow-hidden ${cardSurface}`}
                >
                  {p.image && (
                    <div className="relative w-full aspect-4/3 overflow-hidden">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        placeholder={getBlurDataURL(p.image) ? "blur" : "empty"}
                        blurDataURL={getBlurDataURL(p.image)}
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-lg mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-strong line-clamp-2">{p.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Recent writing */}
        <section className="mb-20 md:mb-24" aria-labelledby="recent-writing-heading">
          <header className="flex items-baseline justify-between mb-6">
            <h2 id="recent-writing-heading" className="font-serif font-bold text-2xl md:text-3xl">Recent writing</h2>
            <Link
              href="/blog"
              className="inline-block py-1 text-sm font-semibold underline underline-offset-4 decoration-dashed hover:decoration-solid"
            >
              See all →
            </Link>
          </header>
          <ul className="grid gap-4 md:grid-cols-2">
            {recentPosts.map((post) => (
              <li key={post.slug} className="reveal">
                <Link
                  href={`/blog/${post.slug}`}
                  className={`group p-5 ${cardSurface}`}
                >
                  <p className="text-xs text-muted mb-2">{formatPostDate(post.date)} · {post.readingMinutes} min</p>
                  <h3 className="font-serif font-bold text-lg mb-2 leading-snug group-hover:text-muted-strong transition-colors duration-200">{post.title}</h3>
                  <p className="text-sm text-muted-strong line-clamp-2">{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact CTA */}
        <section className="mb-10 text-center md:text-left" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="font-serif font-bold text-2xl md:text-3xl mb-2">Get in touch</h2>
          <p className="text-muted-strong mb-3">Want to talk code, cuisine, or both?</p>
          <a
            href={config.social.email}
            className="text-lg text-accent-strong font-semibold underline underline-offset-4 decoration-dashed hover:decoration-solid"
          >
            hello@gpestocchi.com
          </a>
        </section>

        <Nav />
      </main>
      <Footer />
    </div>
  );
}
