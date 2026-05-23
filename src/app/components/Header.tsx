import Link from 'next/link';
import Nav from './Nav';

type HeaderProps = {
  name: string;
};

export default function Header({ name }: HeaderProps) {
  return (
    <header className="text-center justify-center flex flex-col py-5">
      {/*
       * The site name is a brand wordmark, not the page heading.
       * Inner pages declare their own <h1> for the page title, so
       * this is rendered as a styled <p> to keep one <h1> per page
       * (WCAG / semantic-structure best practice).
       */}
      <p className="text-3xl md:text-5xl font-bold font-serif mb-2">
        <Link className="inline-block" href="/">
          {name}
        </Link>
      </p>
      <Nav />
    </header>
  );
}
