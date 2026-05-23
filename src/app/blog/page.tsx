import type { Metadata } from "next";
import Link from 'next/link';
import PageShell from "../components/PageShell";
import config from '../../data/config.json';

export const metadata: Metadata = {
  title: `Blog — ${config.name}`,
  description: `Writing by ${config.name} on software development, cooking, fitness, and the spaces in between.`,
};

type BlogPost = {
  title: string;
  date: string;
  description: string;
  url: string;
};

function parseDate(input: string) {
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? null : d;
}

const blogPosts: BlogPost[] = [
  {
    title: "Rebuilding my portfolio in public: 28 commits and one design audit",
    date: "May 22, 2026",
    description: "What I changed when I treated my own portfolio like a real product — focus rings, dark mode, a 404 page that earns its keep, and the boring fixes nobody talks about.",
    url: "https://medium.com/@gpestocchi/rebuilding-my-portfolio-in-public"
  },
  {
    title: "From Git commits to garlic cloves: a developer's journey into culinary code",
    date: "March 15, 2026",
    description: "How my software-development principles helped me perfect my signature pesto recipe, and what cooking taught me about clean code.",
    url: "https://medium.com/@gpestocchi/from-git-commits-to-garlic-cloves"
  },
  {
    title: "The perfect pesto algorithm: optimising ingredient ratios",
    date: "March 10, 2026",
    description: "A deep dive into the mathematics of pesto making, using data analysis to find the golden ratio of basil to pine nuts.",
    url: "https://medium.com/@gpestocchi/the-perfect-pesto-algorithm"
  },
  {
    title: "REST APIs and rest days: balancing tech and fitness",
    date: "March 5, 2026",
    description: "How a consistent workout routine improved my problem-solving and made me a better developer.",
    url: "https://medium.com/@gpestocchi/rest-apis-and-rest-days"
  },
  {
    title: "Movie-night microservices: breaking down film analysis like code",
    date: "February 28, 2026",
    description: "Applying software-architecture principles to understand complex movie plots, from inception to implementation.",
    url: "https://medium.com/@gpestocchi/movie-night-microservices"
  },
  {
    title: "The developer's kitchen: automating my meal-prep workflow",
    date: "February 20, 2026",
    description: "Building a simple app to streamline weekly meal planning without sacrificing a balanced life.",
    url: "https://medium.com/@gpestocchi/the-developers-kitchen"
  }
];

export default function Blog() {
  return (
    <PageShell>
        <h1 className="text-xl md:text-3xl font-bold text-center justify-center mx-auto pb-5">Blog</h1>
        <p className="text-center mx-auto max-w-[40em] pb-16">
          Welcome to my digital garden where I share thoughts on software development, culinary adventures,
          fitness journey, and movie analyses. Here, you&apos;ll find the intersection of my passions,
          from coding solutions to cooking innovations.
        </p>
        <div className="max-w-[50em] mx-auto">
          {blogPosts.map((post, index) => {
            const d = parseDate(post.date);
            return (
              <article key={index} className="group mb-8 p-6 bg-surface border border-border rounded-lg shadow-lg transform transition-transform duration-200 hover:-translate-y-1">
                <Link
                  href={post.url}
                  className="block"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${post.title} — ${post.description} (opens in new tab)`}
                >
                  <div className="flex flex-col space-y-2">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-muted-strong transition-colors duration-200">
                      {post.title}
                    </h2>
                    <time className="text-sm text-muted" dateTime={d ? d.toISOString() : undefined}>
                      {post.date}
                    </time>
                    <p className="text-muted-strong mt-2">{post.description}</p>
                    <div className="inline-flex items-center gap-1 text-foreground text-sm font-semibold mt-2 transition-transform duration-200 group-hover:translate-x-1">
                      Read more
                      <span aria-hidden="true">→</span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
    </PageShell>
  );
}
