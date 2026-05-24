import type { MetadataRoute } from "next";
import config from "../data/config.json";
import { getAllPosts, getAllTags, slugifyTag } from "../lib/blog";
import { getAllProjects } from "../lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = config.siteUrl.replace(/\/+$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/now`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/uses`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/colophon`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/recipes/pesto`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const tagRoutes: MetadataRoute.Sitemap = getAllTags().map(({ tag }) => ({
    url: `${base}/blog/tags/${slugifyTag(tag)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...tagRoutes, ...projectRoutes];
}
