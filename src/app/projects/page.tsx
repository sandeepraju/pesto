import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import TextProject from "./TextProject";
import ImageProject from "./ImageProject";
import config from '../../data/config.json';
import { getAllProjects } from "../../lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected work by ${config.name}: pesto-adjacent software, recipes, tools, and experiments.`,
};

export default function Projects() {
  const projects = getAllProjects();
  return (
    <PageShell>
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-center mx-auto pb-2">Projects</h1>
        <p className="text-center text-muted mx-auto max-w-[40em] pb-12">
          Things I&apos;ve built when I wasn&apos;t cooking — and a few that sit on the line between the two. Mostly tools for cooks, eaters, and the occasional gym-goer.
        </p>
        <ul className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>li]:mb-4 [&>li]:break-inside-avoid list-none p-0">
          {projects.map((project, index) => (
            <li key={project.slug} className="reveal">
              {project.image
                ? <ImageProject
                    href={`/projects/${project.slug}`}
                    image={project.image}
                    title={project.title}
                    description={project.description}
                    portrait={project.portrait}
                    priority={index < 2}
                    transitionName={`project-image-${project.slug}`}
                  />
                : <TextProject
                    title={project.title}
                    description={project.description}
                    href={`/projects/${project.slug}`}
                  />}
            </li>
          ))}
        </ul>
    </PageShell>
  );
}
