"use client";

import { useMemo, useState } from "react";

type RecipeCard = {
  slug: string;
  title: string;
  image: string;
};

type Props = {
  recipe: RecipeCard;
  allRecipes: RecipeCard[];
};

const SECTIONS = [
  { key: "pics", label: "pics and vids" },
  { key: "ingredients", label: "ingredients" },
  { key: "instructions", label: "instructions" },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

export default function RecipeDetailClient({ recipe, allRecipes }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionKey>("pics");

  const activeLabel = useMemo(() => {
    return SECTIONS.find((s) => s.key === active)?.label ?? "pics and vids";
  }, [active]);

  return (
    <>
      {/* Center dropdown (matches your wireframe) */}
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
        {active === "pics" && (
          <div className="recipe-detail-pics">
            {/* Layout-first: reuse your main grid/card look */}
            <div className="recipes-grid recipe-detail-grid">
              {allRecipes.slice(0, 4).map((r) => (
                <div key={r.slug} className="recipe-card">
                  <img src={r.image} alt={r.title} />
                  <p>{r.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "ingredients" && (
          <div className="recipe-detail-panel">
            <div className="recipe-detail-box">
              <h2 className="recipe-detail-title">Black cod</h2>

              <div className="recipe-detail-text">
                <p>Green onions (for garnish)</p>
                <p>Miso Sauce</p>
                <ul>
                  <li>White miso</li>
                  <li>Sake (or mirin)</li>
                  <li>Maple syrup (or preferred sweetener)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {active === "instructions" && (
          <div className="recipe-detail-panel">
            <div className="recipe-detail-box">
              <h2 className="recipe-detail-title">Instructions</h2>

              <div className="recipe-detail-text">
                <ol>
                  <li>Mix the miso sauce ingredients until smooth.</li>
                  <li>Marinate the cod 24–48 hours (or same day if needed).</li>
                  <li>Broil until caramelized, then finish with a torch if you want char.</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}