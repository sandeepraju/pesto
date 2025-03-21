import Image from 'next/image';
import Link from 'next/link';

type ImageProjectProps = {
  title: string;
  image: string;
  portrait: boolean;
  url: string
};

export default function ImageProject({ title, image, portrait, url }: ImageProjectProps) {
  return (
    <div className={`relative ${image} rounded-lg shadow-lg max-w-full w-full p-6 text-center justify-center transition-transform duration-200 hover:-translate-y-1 ${portrait ? "h-96" : "h-64"}`}>
      <Link className="flex items-center justify-center w-full h-full block z-20" href={url} target="_blank" rel="noopener noreferrer">
        <Image
          src={image}
          alt={title || "Background image"}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute rounded-lg inset-0 bg-black bg-opacity-50"></div>
        {title && <h2 className={`mx-auto text-3xl font-bold mb-4 text-white z-10`}>{title}</h2>}
      </Link>
    </div>
  );
} 