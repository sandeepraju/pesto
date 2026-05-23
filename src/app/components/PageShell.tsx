import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import config from '../../data/config.json';

type Props = {
  children: ReactNode;
  mainClassName?: string;
};

export default function PageShell({ children, mainClassName = "p-2 w-full max-w-full" }: Props) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen mx-auto gap-3 md:max-w-screen-lg">
      <Header name={config.name} />
      <main id="main" className={mainClassName}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
