import { Merriweather } from 'next/font/google';
import Link from 'next/link';
import Nav from './Nav';

const merriweather = Merriweather({
  weight: ["700"],
  subsets: ['latin'],
  variable: '--font-merriweather-serif',
});

type HeaderProps = {
  name: string;
};

export default function Header({ name }: HeaderProps) {
  return (
    <header className="text-center justify-center flex flex-col py-5">
      <h1 className={`text-3xl md:text-5xl font-bold font-serif mb-2 ${merriweather.variable}`}>
        <Link
          className="inline-block"
          href="/">
          {name}
        </Link>
      </h1>
      <Nav />
      <hr className="border-t border-gray-300 mx-auto w-3/4 mt-4" />
    </header>
  );
} 