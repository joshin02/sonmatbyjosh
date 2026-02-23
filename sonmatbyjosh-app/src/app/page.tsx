"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

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

  // Handle invite token redirect
  useEffect(() => {
    // Initialize Netlify Identity
    netlifyIdentity.init();

    // If URL contains invite token, redirect to /admin with token
    const tokenMatch = window.location.hash.match(/invite_token=([^&]+)/);
    if (tokenMatch) {
      window.location.href = "/admin" + window.location.hash;
    }

    // Optional: if user logs in from homepage, redirect to /admin
    netlifyIdentity.on("login", () => {
      window.location.href = "/admin/";
    });
  }, []);

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