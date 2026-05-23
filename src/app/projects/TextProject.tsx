import Link from 'next/link';

type TextProjectProps = {
  title: string;
  description?: string | null;
  href: string;
  bg?: string;
};

export default function TextProject({ title, description, href, bg = 'bg-surface-muted' }: TextProjectProps) {
  return (
    <article className={`group block ${bg} border border-border rounded-lg shadow-lg max-w-full w-full transition-transform duration-200 hover:-translate-y-1`}>
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
