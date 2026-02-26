"use client";

import { useMemo, useState } from "react";
import type { Recipe } from "@/lib/recipes";

const SECTIONS = [
  { key: "pics", label: "pics and vids" },
  { key: "ingredients", label: "ingredients" },
  { key: "instructions", label: "instructions" },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

export default function RecipeDetailClient({ recipe }: { recipe: Recipe }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionKey>("pics");

  const activeLabel = useMemo(() => {
    return SECTIONS.find((s) => s.key === active)?.label ?? "pics and vids";
  }, [active]);

  const media = recipe.media ?? [];
  const ingredients = recipe.ingredients ?? [];
  const instructions = recipe.instructions ?? [];

  return (
    <>
      {/* Center dropdown */}
      <section className="recipe-detail-nav">
        <div className="recipe-detail-dropdown">
          <button
            type="button"
            className="recipe-detail-dropdown-btn"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <span>{activeLabel}</span>
            <span className={`chev ${open ? "up" : ""}`}>▾</span>
          </button>

          {open && (
            <div className="recipe-detail-dropdown-menu" role="menu">
              {SECTIONS.filter((s) => s.key !== active).map((s) => (
                <button
                  key={s.key}
                  type="button"
                  className="recipe-detail-dropdown-item"
                  onClick={() => {
                    setActive(s.key);
                    setOpen(false);
                  }}
                  role="menuitem"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section content */}
      <section className="recipe-detail-body">
        {/* pics and vids */}
        {active === "pics" && (
          <div className="recipe-detail-pics">
            <div className="recipe-gallery-grid">
              {media.length === 0 ? (
                <div className="recipe-detail-empty">
                  <p>Media coming soon.</p>
                </div>
              ) : (
                media.map((m, idx) => {
                  if (m.type === "image") {
                    return (
                      <div key={idx} className="recipe-gallery-item">
                        <div className="recipe-gallery-frame">
                          <img src={m.src} alt={m.alt ?? recipe.title} />
                        </div>
                      </div>
                    );
                  }

                  // MP4 video (uploaded via Decap) - loop, muted, no controls
                  return (
                    <div key={idx} className="recipe-gallery-item">
                      <div className="recipe-gallery-frame">
                        <video
                          src={m.file}
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls={false}
                          preload="metadata"
                        />
                      </div>

                      {m.alt?.trim() ? (
                        <p className="recipe-detail-video-caption">
                          {m.alt.trim()}
                        </p>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ingredients */}
        {active === "ingredients" && (
          <div className="recipe-detail-panel">
            <div className="recipe-detail-box">
              <h2 className="recipe-detail-title">{recipe.title}</h2>

              <div className="recipe-detail-text">
                {ingredients.length === 0 ? (
                  <p>Ingredients coming soon.</p>
                ) : (
                  <ul>
                    {ingredients.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* instructions */}
        {active === "instructions" && (
          <div className="recipe-detail-panel">
            <div className="recipe-detail-box">
              <h2 className="recipe-detail-title">Instructions</h2>

              <div className="recipe-detail-text">
                {instructions.length === 0 ? (
                  <p>Instructions coming soon.</p>
                ) : (
                  <ol>
                    {instructions.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}