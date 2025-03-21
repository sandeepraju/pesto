// Render everything client side as this is a static-site.
'use client'

import Image from 'next/image';
import Footer from "../components/Footer";
import Header from "../components/Header";
import config from '../../data/config.json';

export default function About() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen mx-auto gap-3 md:max-w-screen-lg">
      <Header name={config.name} />
      <main className="p-2 w-full max-w-full text-center justify-center">
        <h1 className="text-xl md:text-3xl font-bold text-center justify-center mx-auto pb-5">About</h1>
        <div className="md:max-w-[50%] inline-block p-4 bg-white rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 mb-10">
          <Image
            src="/img/giovanni-pasta.jpeg"
            alt="Doing what I do best! 🍝"
            width={600}
            height={400}
            priority
          />
          <p className="text-center text-gray-600 mt-2 font-medium">Doing what I do best! 🍝</p>
        </div>
        <div className="md: max-w-[70%] text-center justify-center mx-auto">
          <p className="mb-5">
            Hi there! My name is Giovanni Pestocchi, and I like to think of myself as a jack of two trades: software development and culinary adventures. By day, I&apos;m deep in code, solving problems, and creating digital magic. But once the workday ends, I swap my keyboard for a cutting board and dive headfirst into the culinary world. My kitchen is where I let my creativity flow, and trust me, it&apos;s every bit as satisfying as debugging a stubborn piece of code—minus the occasional onion tears!
          </p>
          <p className="mb-5">
            Pesto holds a special place in my heart. If there&apos;s one thing you&apos;ll always find in my fridge, it&apos;s a jar of freshly made pesto. Basil, garlic, olive oil, pine nuts—it&apos;s like a symphony of flavors that can elevate anything. I&apos;ve tossed it with pasta, spread it on pizza, and even experimented with it in omelets. (Pro tip: pesto in your scrambled eggs is a game-changer!) There&apos;s something incredibly satisfying about taking simple ingredients and turning them into a dish that&apos;s more than the sum of its parts.
          </p>
          <p className="mb-5">
            When I&apos;m not busy writing code or perfecting my pesto recipes, you&apos;ll probably find me curled up on the couch, binge-watching movies or TV shows. I have a deep appreciation for storytelling, whether it&apos;s a classic film noir or the latest action-packed blockbuster. My tastes are all over the place—quirky indie films, gripping thrillers, heartfelt dramas—you name it. And yes, I&apos;ve been known to stay up way too late finishing &quot;just one more episode.&quot;
          </p>
          <p className="mb-5">
            I&apos;m also a firm believer in balance, which is why I make it a point to stay active. The gym is my second home, and there&apos;s no better feeling than crushing a workout after a long day. Whether it&apos;s lifting weights, going for a run, or trying out a new fitness class, staying fit is my way of keeping both my body and mind sharp. Plus, let&apos;s be real—it&apos;s nice to earn those extra calories for my next culinary experiment!
          </p>
          <p className="mb-5">
            Life, to me, is all about finding joy in the little things and chasing passions with unrelenting enthusiasm. Whether I&apos;m perfecting a new recipe, cracking a tricky coding challenge, or simply enjoying a quiet moment with a good movie, I&apos;m all about savoring the journey. Oh, and if you ever need a tech-savvy friend who can also whip up a mean pesto pasta, you know who to call.
          </p>
          <p className="mb-5">
            So, that&apos;s me in a nutshell: a software developer with a flair for food, a movie buff with a fitness streak, and someone who believes that life&apos;s best moments often come from blending the unexpected. Let&apos;s connect—over code, over cuisine, or maybe even both!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
