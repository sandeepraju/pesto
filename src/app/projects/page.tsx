import type { Metadata } from "next";
import Footer from "../components/Footer";
import TextProject from "./TextProject";
import ImageProject from "./ImageProject";
import Header from "../components/Header";
import config from '../../data/config.json';

export const metadata: Metadata = {
  title: `Projects — ${config.name}`,
  description: `Selected work by ${config.name}: pesto-adjacent software, recipes, tools, and experiments.`,
};

export default function Projects() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen mx-auto gap-3 md:max-w-screen-lg">
      <Header name={config.name} />
      <main className="p-2 w-full max-w-full">
        <h1 className="text-xl md:text-3xl font-bold text-center justify-center mx-auto pb-5">Projects</h1>
        <p className="text-center mx-auto max-w-[40em] pb-16">
          As a software developer by day and a culinary artist, my passions fuel my creativity both in and out of the kitchen. Whether I&apos;m perfecting pesto recipes or building innovative software solutions, I approach everything with enthusiasm and curiosity. This page is a glimpse into the projects I&apos;ve worked on, inspired by my interests—from tech and problem-solving to food, fitness, and entertainment.
        </p>
        <ul className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>li]:mb-4 [&>li]:break-inside-avoid list-none p-0">
          {config.projects.map((project, index) => (
            <li key={index}>
              {project.image
                ? <ImageProject url={project.url} image={project.image} title={project.title} portrait={project.portrait} />
                : <TextProject title={project.title} description={project.description} url={project.url} />}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
