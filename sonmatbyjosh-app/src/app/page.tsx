"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

export default function HomePage() {
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState("RECIPES");
  const [illustrationSrc, setIllustrationSrc] = useState("/img/josh.png");
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeUtensil, setActiveUtensil] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  const navOptions = ["RECIPES", "REVIEWS", "ABOUT", "BLOG"];

  const pageUtensils: Record<string, string> = {
    RECIPES: "/img/ladle.png",
    REVIEWS: "/img/spoon.png",
    ABOUT: "/img/josh-v2.png",
    BLOG: "/img/fork.png",
  };

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

  const animateToPath = (nextPath: string) => {
    if (isAnimating || nextPath === selectedPath) return;

    setIsAnimating(true);
    setAnimationKey((prev) => prev + 1);

    setSelectedPath(nextPath);
    setActiveUtensil(pageUtensils[nextPath]);
    setIllustrationSrc("/img/pan-flip.gif");

    setTimeout(() => {
      setIllustrationSrc("/img/josh.png");
      setIsAnimating(false);
    }, 500);
  };

  const playAnimation = () => {
    const currentIndex = navOptions.indexOf(selectedPath);
    const nextPath = navOptions[(currentIndex + 1) % navOptions.length];

    animateToPath(nextPath);
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
            onChange={(e) => animateToPath(e.target.value)}
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

        <div className="home-illustration" onClick={playAnimation}>
          <img
            className="chef-image"
            src={illustrationSrc}
            alt="SonMat by Josh"
          />

          {activeUtensil && (
            <img
              key={animationKey}
              className={`utensil-flip ${selectedPath.toLowerCase()}-utensil`}
              src={activeUtensil}
              alt=""
            />
          )}
        </div>
      </section>
    </main>
  );
}