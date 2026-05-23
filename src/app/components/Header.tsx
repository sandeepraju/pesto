import Link from 'next/link';
import Nav from './Nav';

type HeaderProps = {
  name: string;
};

export default function Header({ name }: HeaderProps) {
  return (
    <header className="text-center justify-center flex flex-col py-5">
      <h1 className="text-3xl md:text-5xl font-bold font-serif mb-2">
        <Link
          className="inline-block"
          href="/">
          {name}
        </Link>
      </h1>
      <Nav />
    </header>
  );
}
