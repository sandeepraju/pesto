import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import TextProject from "./TextProject";
import ImageProject from "./ImageProject";
import config from '../../data/config.json';

export const metadata: Metadata = {
  title: `Projects — ${config.name}`,
  description: `Selected work by ${config.name}: pesto-adjacent software, recipes, tools, and experiments.`,
};

export default function Projects() {
  return (
    <PageShell>
        <h1 className="text-xl md:text-3xl font-bold text-center justify-center mx-auto pb-5">Projects</h1>
        <p className="text-center mx-auto max-w-[40em] pb-16">
          As a software developer by day and a culinary artist, my passions fuel my creativity both in and out of the kitchen. Whether I&apos;m perfecting pesto recipes or building innovative software solutions, I approach everything with enthusiasm and curiosity. This page is a glimpse into the projects I&apos;ve worked on, inspired by my interests—from tech and problem-solving to food, fitness, and entertainment.
        </p>
        <ul className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>li]:mb-4 [&>li]:break-inside-avoid list-none p-0">
          {config.projects.map((project, index) => (
            <li key={index}>
              {project.image
                ? <ImageProject
                    url={project.url}
                    image={project.image}
                    title={project.title}
                    description={project.description}
                    portrait={project.portrait}
                    priority={index < 2}
                  />
                : <TextProject title={project.title} description={project.description} url={project.url} />}
            </li>
          ))}
        </ul>
    </PageShell>
  );
}
