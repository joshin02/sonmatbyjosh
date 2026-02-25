import Header from "@/components/header";
import RecipeDetailClient from "@/components/recipe-detail-client";
import { getAllRecipes, getRecipeBySlug } from "@/lib/recipes";
import { notFound } from "next/navigation";

// 🔥 Pre-generate all recipe routes at build time
export function generateStaticParams() {
  const recipes = getAllRecipes();

  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default function RecipeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const recipe = getRecipeBySlug(params.slug);

  // If no markdown file exists for this slug → 404 page
  if (!recipe) {
    return notFound();
  }

  return (
    <>
      <Header />

      <main className="recipe-detail-page">
        {/* Brown intro/story section from CMS */}
        <section className="recipes-intro card">
          <div className="recipes-intro-inner">
            <p>{recipe.intro || "Recipe story coming soon."}</p>
          </div>
        </section>

        {/* Pass full CMS recipe object to client component */}
        <RecipeDetailClient recipe={recipe} />
      </main>
    </>
  );
}