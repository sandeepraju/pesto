import Link from 'next/link';

type TextProjectProps = {
  title: string;
  description?: string | null;
  url: string;
  bg?: string;
};

export default function TextProject({ title, description, url, bg = 'bg-surface-muted' }: TextProjectProps) {
  return (
    <article className={`group block ${bg} border border-border rounded-lg shadow-lg max-w-full w-full transition-transform duration-200 hover:-translate-y-1`}>
      <Link
        className="block w-full h-full p-6"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={description ? `${title} — ${description} (opens in new tab)` : `${title} (opens in new tab)`}
      >
        <h2 className="text-2xl font-bold mb-2 text-foreground">{title}</h2>
        {description && <p className="text-muted-strong">{description}</p>}
      </Link>
    </article>
  );
}
