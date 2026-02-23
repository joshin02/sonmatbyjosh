"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState("RECIPES");

  // Map dropdown options to actual routes
  const routeMap: Record<string, string> = {
    RECIPES: "/recipes",
    REVIEWS: "/reviews",
    ABOUT: "/about",
    BLOG: "/blog",
  };

  const handleGoClick = () => {
    const path = routeMap[selectedPath];
    if (path) {
      router.push(path);
    }
  };

  return (
    <main className="home page">
      <section className="home-hero">
        <h1 className="home-title">SonMat</h1>
        <p className="home-subtitle">by josh</p>

        <div className="home-actions">
          <select
            className="home-select"
            value={selectedPath}
            onChange={(e) => setSelectedPath(e.target.value)}
          >
            <option>RECIPES</option>
            <option>REVIEWS</option>
            <option>ABOUT</option>
            <option>BLOG</option>
          </select>

          <button
            className="home-handwritten"
            onClick={handleGoClick}
            type="button"
          >
            let's go!
          </button>
        </div>

        <div className="home-illustration">
          <img src="/illustration.png" alt="Sonmat illustration" />
        </div>
      </section>
    </main>
  );
}