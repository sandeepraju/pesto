import Image from 'next/image';
import Link from 'next/link';
import { getBlurDataURL } from '../../lib/blur';

type ImageProjectProps = {
  title: string;
  description?: string;
  image: string;
  portrait: boolean;
  href: string;
  priority?: boolean;
  transitionName?: string;
};

export default function ImageProject({ title, description, image, portrait, href, priority = false, transitionName }: ImageProjectProps) {
  const blurDataURL = getBlurDataURL(image);
  return (
    <article className={`group relative rounded-lg shadow-lg overflow-hidden max-w-full w-full transition-transform duration-200 hover:-translate-y-1 ${portrait ? "h-96" : "h-64"}`}>
      <Link
        className="flex items-end w-full h-full p-6"
        href={href}
        aria-label={description ? `${title} — ${description}` : title}
      >
        <Image
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          style={transitionName ? { viewTransitionName: transitionName } : undefined}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" aria-hidden="true"></div>
        <div className="relative z-10 text-left text-white">
          <h2 className="text-2xl md:text-3xl font-bold font-serif drop-shadow-md">{title}</h2>
          {description && (
            <p className="mt-2 text-sm md:text-base text-white/90 line-clamp-3 max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 group-focus-within:max-h-32 group-focus-within:opacity-100 transition-all duration-300 ease-out">
              {description}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
