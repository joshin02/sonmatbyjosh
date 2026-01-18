"use client";

import { useState } from "react";
import Header from "@/components/header";

const RECIPES = [
  "Miso Black Cod",
  "Aglio e Olio",
  "Chawanmushi",
  "Coming Soon",
  "Another Dish",
  "Future Recipe",
];

const PAGE_SIZE = 4;

export default function RecipesPage() {
  const [page, setPage] = useState(0);

  const start = page * PAGE_SIZE;
  const visibleRecipes = RECIPES.slice(start, start + PAGE_SIZE);

  function nextPage() {
    if (start + PAGE_SIZE < RECIPES.length) {
      setPage((p) => p + 1);
    }
  }

  function prevPage() {
    if (page > 0) {
      setPage((p) => p - 1);
    }
  }

  return (
    <>
      <Header />

      <main className="recipes-page">
        <section className="recipes-intro card">
          <div className="recipes-intro-inner">
            <p>
              Welcome to my recipes page! This is where I will post recipes for dishes I have created and feel satisfied are ready to share with you guys. 
              Once a recipe goes up, I’ve already played around with the ratios multiple times and landed on what I think tastes best—but that’s just my preference. 
              As the name of my website and social media implies, I go off of feeling when it comes to ingredient measurements and adjust as I cook. Recipes I post will have guideline ratios but ultimately, 
              I believe a dish will taste best when it’s adjusted to individual taste preferences. Hope you guys enjoy these dishes as much as me and please bare with me with how often recipes are released! 
            </p>
          </div>
        </section>

        <section className="recipes-grid">
          {visibleRecipes.map((title) => (
            <div key={title} className="recipe-card">
              <img src="/img/placeholder.jpg" alt={title} />
              <p>{title}</p>
            </div>
          ))}
        </section>

        {/* Navigation */}
        <div className="recipes-nav">
          <button onClick={prevPage} disabled={page === 0}>
            ←
          </button>
          <button
            onClick={nextPage}
            disabled={start + PAGE_SIZE >= RECIPES.length}
          >
            →
          </button>
        </div>
      </main>
    </>
  );
}