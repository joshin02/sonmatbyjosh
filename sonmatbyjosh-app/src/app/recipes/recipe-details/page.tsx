import Header from "@/components/header";
import RecipeDetailClient from "@/components/recipe-detail-client";
import { getAllRecipes } from "@/lib/recipes";

export default function RecipeDetailPage({ params }: { params: { slug: string } }) {
  // Layout-first: grab a recipe from your existing list (title/image/slug),
  // then use placeholders for the rest until Decap fields are wired in.
  const recipes = getAllRecipes();
  const recipe = recipes.find((r) => r.slug === params.slug);

  // Basic fallback so the page doesn't crash during layout work
  const safeRecipe = recipe ?? {
    slug: params.slug,
    title: "Coming soon",
    image: "/img/placeholder.jpg",
  };

  return (
    <>
      <Header />

      <main className="recipe-detail-page">
        {/* Same style as recipes-intro (brown story block) */}
        <section className="recipes-intro card">
          <div className="recipes-intro-inner">
            <p>
              Black cod, when cooked right, has a very rich and sweet taste that pairs well with umami flavors...
              {/* later: replace with recipe.description / recipe.story from Decap */}
            </p>
          </div>
        </section>

        <RecipeDetailClient recipe={safeRecipe} allRecipes={recipes} />
      </main>
    </>
  );
}