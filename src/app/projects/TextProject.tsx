import Link from 'next/link';
import { cardSurfaceMuted } from '../../lib/styles';

type TextProjectProps = {
  title: string;
  description?: string | null;
  href: string;
};

export default function TextProject({ title, description, href }: TextProjectProps) {
  return (
    <article className={`group ${cardSurfaceMuted} max-w-full w-full`}>
      <Link
        className="block w-full h-full p-6"
        href={href}
        aria-label={description ? `${title} — ${description}` : title}
      >
        <h2 className="text-2xl font-bold font-serif mb-2 text-foreground">{title}</h2>
        {description && <p className="text-muted-strong">{description}</p>}
      </Link>
    </article>
  );
}
