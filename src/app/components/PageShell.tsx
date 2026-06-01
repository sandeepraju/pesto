import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import config from '../../data/config.json';

type Props = {
  children: ReactNode;
  mainClassName?: string;
};

export default function PageShell({ children, mainClassName = "px-4 py-2 w-full" }: Props) {
  return (
    // grid-cols-[minmax(0,1fr)] is the key: CSS grid items default to
    // min-width: auto, which lets long unbreakable content (e.g. a
    // <pre><code> line in an MDX post) blow out the column track and
    // push the whole layout past the viewport on mobile. Constraining
    // the track with minmax(0, 1fr) means children obey the parent
    // width and any horizontal overflow stays contained (e.g. <pre>'s
    // own overflow-x: auto can do its job).
    <div className="grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto] min-h-screen mx-auto gap-3 w-full md:max-w-(--breakpoint-lg)">
      <Header name={config.name} />
      <main id="main" className={`min-w-0 ${mainClassName}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
