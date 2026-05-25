import Link from "next/link";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import config from "../../data/config.json";
import { getAllPosts } from "../../lib/blog";

type ColumnLink =
  | { kind: "internal"; href: string; label: string; icon?: React.ReactNode }
  | { kind: "external"; href: string; label: string; icon?: React.ReactNode };

const linkClass = "inline-flex items-center gap-1.5 hover:underline underline-offset-4 decoration-dashed";

function FooterLink({ link }: { link: ColumnLink }) {
  const content = (
    <>
      {link.icon && <span className="text-sm" aria-hidden="true">{link.icon}</span>}
      {link.label}
    </>
  );
  return link.kind === "external" ? (
    <a className={linkClass} href={link.href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link className={linkClass} href={link.href}>
      {content}
    </Link>
  );
}

export default function Footer() {
  const latest = getAllPosts()[0];

  const site: ColumnLink[] = [
    { kind: "internal", href: "/", label: "Home" },
    { kind: "internal", href: "/about", label: "About" },
    { kind: "internal", href: "/projects", label: "Projects" },
    { kind: "internal", href: "/uses", label: "Uses" },
    { kind: "internal", href: "/colophon", label: "Colophon" },
  ];

  const writing: ColumnLink[] = [
    ...(latest ? [{ kind: "internal" as const, href: `/blog/${latest.slug}`, label: "Latest post" }] : []),
    { kind: "internal", href: "/blog", label: "All posts" },
    { kind: "internal", href: "/recipes/pesto", label: "Pesto recipe" },
  ];

  const findMe: ColumnLink[] = [
    { kind: "external", href: config.social.linkedin, label: "LinkedIn", icon: <FaLinkedin /> },
    { kind: "external", href: config.social.github, label: "GitHub", icon: <FaGithub /> },
    { kind: "external", href: config.social.x, label: "X", icon: <FaSquareXTwitter /> },
    { kind: "external", href: config.social.medium, label: "Medium", icon: <FaMedium /> },
    { kind: "external", href: config.social.email, label: "Email", icon: <MdOutlineAlternateEmail /> },
  ];

  const currently: ColumnLink[] = [
    { kind: "internal", href: "/now", label: "What I'm doing now" },
    { kind: "internal", href: "/uses", label: "What I use" },
  ];

  const columns: { heading: string; links: ColumnLink[] }[] = [
    { heading: "Site", links: site },
    { heading: "Writing", links: writing },
    { heading: "Find me", links: findMe },
    { heading: "Currently", links: currently },
  ];

  return (
    <footer className="border-t border-border mt-12 pt-10 pb-6 text-sm text-muted-strong">
      <div className="grid gap-10 md:gap-12 md:grid-cols-[1.1fr_2fr]">
        {/* Identity block */}
        <div>
          <p className="font-serif font-bold text-lg text-foreground mb-1">{config.name}</p>
          <p className="text-muted">Software developer · Culinary artist</p>
          <p className="text-muted mb-4">Brooklyn, NY</p>
          <a
            href={config.social.email}
            className="inline-flex items-center gap-1 text-accent-strong font-semibold underline underline-offset-4 decoration-dashed hover:decoration-solid"
          >
            hello@gpestocchi.com
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* 4 short columns */}
        <nav aria-label="Footer" className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs uppercase tracking-[0.15em] text-muted font-semibold mb-3">
                {col.heading}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={`${col.heading}-${link.label}`}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted">
        <p>{config.name} © {new Date().getFullYear()}</p>
        <p>
          <a
            className="hover:underline hover:underline-offset-4 decoration-dashed"
            href={config.fork}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Source on GitHub (opens in new tab)"
          >
            <FaGithub aria-hidden="true" className="inline-block align-[-2px]" /> Source on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
