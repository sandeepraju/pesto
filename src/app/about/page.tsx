// Render everything client side as this is a static-site.
'use client'

import { Merriweather } from 'next/font/google';

const merriweather = Merriweather({
  weight: ["700"],
  subsets: ['latin'],
  variable: '--font-merriweather-serif',
});

import Nav from '../nav';
import Footer from "../footer";

import config from '../../data/config.json';


export default function Projects() {

  return (
    <div className="grid grid-rows-[10em_auto_4em] min-h-screen mx-auto gap-3 md:max-w-screen-lg">
      <header className="text-center justify-center">
        <h1 className={`inline-block text-3xl md:text-5xl font-bold mt-5 font-serif ${merriweather.variable}`}>
          <a
            className="inline-block"
            href="/"
            target="_self"
            rel="noopener noreferrer">
            {config.name}
          </a>
        </h1>
        <Nav />
        <hr className="inline-block border-t border-gray-300 mx-auto mb-5 w-3/4" />
      </header>
      <main className="p-2 w-full max-w-full text-center justify-center">
        <h1 className="text-xl md:text-3xl font-bold text-center justify-center mx-auto pb-5">About</h1>
        <div className="md:max-w-[50%] inline-block p-4 bg-white rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105">
          <img
            src="/img/giovanni-pasta.jpeg"
            alt="Example Photograph"
          />
          <p className="text-center text-gray-600 mt-2 font-medium">A Beautiful Memory</p>
        </div>
      </main>
      <Footer />
    </div >
  );
}
