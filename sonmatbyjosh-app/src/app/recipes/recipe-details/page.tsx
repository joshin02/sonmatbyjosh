"use client";

import { useState } from "react";
import Header from "@/components/header";

export default function RecipeDetailPage() {
  const [section, setSection] = useState<"media" | "ingredients" | "recipe">(
    "media"
  );

  return (
    <>
      <Header />

      <main className="recipe-detail-page">
        {/* BANNER */}
        <section className="recipe-detail-hero">
          <div className="recipe-detail-hero-inner">
            <p>
              This is one of my favorite dishes to make when I want something
              comforting but still packed with flavor. Adjust everything to
              taste — trust your instincts.
            </p>
          </div>
        </section>

        {/* DROPDOWN */}
        <div className="recipe-detail-nav">
          <select
            value={section}
            onChange={(e) =>
              setSection(e.target.value as "media" | "ingredients" | "recipe")
            }
          >
            <option value="media">pics & videos</option>
            <option value="ingredients">ingredients</option>
            <option value="recipe">recipe</option>
          </select>
        </div>

        {/* SWITCHED CONTENT */}
        <section className="recipe-section">
          {section === "media" && (
            <div className="recipe-media-carousel">
              <div className="recipe-media-card">
                <img src="/img/placeholder.jpg" alt="Dish media" />
              </div>
            </div>
          )}

          {section === "ingredients" && (
            <div className="recipe-detail-content">
              <h2>Ingredients</h2>
              <ul>
                <li>Black cod</li>
                <li>White miso</li>
                <li>Sugar</li>
                <li>Sake</li>
                <li>Mirin</li>
              </ul>
            </div>
          )}

          {section === "recipe" && (
            <div className="recipe-detail-content">
              <h2>Recipe</h2>
              <ul>
                <li>Mix marinade ingredients until smooth</li>
                <li>Marinate fish overnight</li>
                <li>Broil until caramelized</li>
                <li>Rest briefly and serve</li>
              </ul>
            </div>
          )}
        </section>
      </main>
    </>
  );
}