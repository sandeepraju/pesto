// Render everything client side as this is a static-site.
'use client'

import Image from "next/image";

import Footer from "../footer";

export default function Home() {
  return (
    <div className="grid grid-rows-[4em_auto_4em] min-h-screen mx-auto gap-3">
      <header className="flex items-center justify-center">
      </header>
      <main className="p-2">
      </main>
      <Footer />
    </div>
  );
}
