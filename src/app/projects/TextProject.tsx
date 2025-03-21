import Link from 'next/link';

type TextProjectProps = {
  title: string;
  description?: string | null;
  url: string;
  bg?: string;
};

export default function TextProject({ title, description, url, bg = 'bg-slate-100' }: TextProjectProps) {
  return (
    <div className="display-block max-w-full w-full p-2">
      <div className={`display-block ${bg} rounded-lg shadow-lg max-w-full w-full p-6 text-center justify-center transition-transform duration-200 hover:-translate-y-1`}>
        <Link className="w-full h-full block" href={url} target="_blank" rel="noopener noreferrer">
          <h2 className={`text-2xl font-bold mb-4 text-gray-800`}>{title}</h2>
          {description && <p className="text-gray-600">{description}</p>}
        </Link>
      </div>
    </div>
  );
} 