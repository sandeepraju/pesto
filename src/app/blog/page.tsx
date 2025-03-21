// Render everything client side as this is a static-site.
'use client'

import Link from 'next/link';
import Header from "../components/Header";
import Footer from "../components/Footer";
import config from '../../data/config.json';

type BlogPost = {
  title: string;
  date: string;
  description: string;
  url: string;
};

const blogPosts: BlogPost[] = [
  {
    title: "From Git Commits to Garlic Cloves: A Developer's Journey into Culinary Code",
    date: "March 15, 2024",
    description: "How my software development principles helped me perfect my signature pesto recipe, and what cooking taught me about clean code.",
    url: "https://example.com"
  },
  {
    title: "The Perfect Pesto Algorithm: Optimizing Ingredient Ratios",
    date: "March 10, 2024",
    description: "A deep dive into the mathematics of pesto making, using data analysis to find the golden ratio of basil to pine nuts.",
    url: "https://example.com"
  },
  {
    title: "REST APIs and Rest Days: Balancing Tech and Fitness",
    date: "March 5, 2024",
    description: "How maintaining a consistent workout routine improved my problem-solving skills and made me a better developer.",
    url: "https://example.com"
  },
  {
    title: "Movie Night Microservices: Breaking Down Film Analysis Like Code",
    date: "February 28, 2024",
    description: "Applying software architecture principles to understand complex movie plots, from inception to implementation.",
    url: "https://example.com"
  },
  {
    title: "The Developer's Kitchen: Automating My Meal Prep Workflow",
    date: "February 20, 2024",
    description: "Building a simple app to streamline my weekly meal planning while maintaining a healthy work-life balance.",
    url: "https://example.com"
  }
];

export default function Blog() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen mx-auto gap-3 md:max-w-screen-lg">
      <Header name={config.name} />
      <main className="p-2 w-full max-w-full">
        <h1 className="text-xl md:text-3xl font-bold text-center justify-center mx-auto pb-5">Blog</h1>
        <p className="text-center mx-auto max-w-[40em] pb-16">
          Welcome to my digital garden where I share thoughts on software development, culinary adventures,
          fitness journey, and movie analyses. Here, you&apos;ll find the intersection of my passions,
          from coding solutions to cooking innovations.
        </p>
        <div className="max-w-[50em] mx-auto">
          {blogPosts.map((post, index) => (
            <article key={index} className="mb-8 p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-200 hover:-translate-y-1">
              <Link href={post.url} className="block" target="_blank" rel="noopener noreferrer">
                <div className="flex flex-col space-y-2">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 hover:text-gray-600">
                    {post.title}
                  </h2>
                  <time className="text-sm text-gray-500">{post.date}</time>
                  <p className="text-gray-600 mt-2">{post.description}</p>
                  <div className="text-gray-800 text-sm font-medium hover:text-gray-600 mt-2 transition-colors duration-200">
                    Read more →
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
