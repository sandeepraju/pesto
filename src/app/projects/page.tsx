// Render everything client side as this is a static-site.
'use client'

import dynamic from 'next/dynamic';
import Footer from "../components/Footer";
import TextProject from "./TextProject";
import ImageProject from "./ImageProject";
import Header from "../components/Header";
import config from '../../data/config.json';

// The library 'react-responsive-masonry' manipulates the DOM directly 
// to render the masonry grid. This causes mismatches with SSR.
// Even though SSR is disabled with 'use client' directive at the top of the file
// NextJS tries to render the component on server side for some reason I can't figure out.
// Using the dynamic import to explictly mark this library to render client side helps in this case.
// The following import will be re-written using the dynamic import.
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
const Masonry = dynamic(() => import("react-responsive-masonry").then(mod => mod.default), { ssr: false });
const ResponsiveMasonry = dynamic(() => import("react-responsive-masonry").then(mod => mod.ResponsiveMasonry), { ssr: false });

export default function Projects() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen mx-auto gap-3 md:max-w-screen-lg">
      <Header name={config.name} />
      <main className="p-2 w-full max-w-full">
        <h1 className="text-xl md:text-3xl font-bold text-center justify-center mx-auto pb-5">&lt;Projects /&gt;</h1>
        <p className="text-center mx-auto max-w-[40em] pb-16">
          As a software developer by day and a culinary artist, my passions fuel my creativity both in and out of the kitchen. Whether I&apos;m perfecting pesto recipes or building innovative software solutions, I approach everything with enthusiasm and curiosity. This page is a glimpse into the projects I&apos;ve worked on, inspired by my interests—from tech and problem-solving to food, fitness, and entertainment.
        </p>
        <ResponsiveMasonry columnsCountBreakPoints={{ 640: 1, 768: 2, 1024: 3 }}>
          <Masonry sequential={true} gutter="16px">
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
    </div>
  );
}
