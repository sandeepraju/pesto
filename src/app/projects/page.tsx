// Render everything client side as this is a static-site.
'use client'

import dynamic from 'next/dynamic';

// The library 'react-responsive-masonry' manipulates the DOM directly 
// to render the masonry grid. This causes mismatches with SSR.
// Even though SSR is disabled with 'use client' directive at the top of the file
// NextJS tries to render the component on server side for some reason I can't figure out.
// Using the dynamic import to explictly mark this library to render client side helps in this case.
// The following import will be re-written using the dynamic import.
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
const Masonry = dynamic(() => import("react-responsive-masonry").then(mod => mod.default), { ssr: false });
const ResponsiveMasonry = dynamic(() => import("react-responsive-masonry").then(mod => mod.ResponsiveMasonry), { ssr: false });

import { Merriweather } from 'next/font/google';

const merriweather = Merriweather({
  weight: ["700"],
  subsets: ['latin'],
  variable: '--font-merriweather-serif',
});

import Footer from "../footer";
import TextProject from "./text-project";
import ImageProject from "./image-project";

import config from '../../data/config.json';
import Nav from '../nav';

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
      <main className="p-2 w-full max-w-full">
        <h1 className="text-xl md:text-3xl font-bold text-center justify-center mx-auto pb-5">&lt;Projects /&gt;</h1>
        <p className="text-center mx-auto max-w-[40em] pb-16">
          As a software developer by day and a culinary artist, my passions fuel my creativity both in and out of the kitchen. Whether I’m perfecting pesto recipes or building innovative software solutions, I approach everything with enthusiasm and curiosity. This page is a glimpse into the projects I’ve worked on, inspired by my interests—from tech and problem-solving to food, fitness, and entertainment.
        </p>
        <ResponsiveMasonry columnsCountBreakPoints={{ 640: 1, 768: 2, 1024: 3 }}>
          <Masonry sequential={true} gutter='16px'>
            {config.projects.map((project, index) => {
              if (project.image === undefined || project.image === null || project.image.length === 0) {
                return <TextProject key={index} title={project.title} description={project.description} url={project.url} />
              } else {
                return <ImageProject key={index} url={project.url} image={project.image} title={project.title} portrait={project.portrait} />
              }
            })}
          </Masonry>
        </ResponsiveMasonry>
      </main>
      <Footer />
    </div >
  );
}
