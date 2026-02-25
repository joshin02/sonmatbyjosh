import Header from "@/components/header";
import RecipeDetailClient from "@/components/recipe-detail-client";
import { getAllRecipes, getRecipeBySlug } from "@/lib/recipes";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const recipes = getAllRecipes();
  return recipes.map((r) => ({ slug: r.slug }));
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const recipe = getRecipeBySlug(slug);
  if (!recipe) return notFound();

  return (
    <>
      <Header />
      <main className="recipe-detail-page">
        <section className="recipes-intro card">
          <div className="recipes-intro-inner">
            <p>{recipe.intro || "Recipe story coming soon."}</p>
          </div>
        </section>

        <RecipeDetailClient recipe={recipe} />
      </main>
    </>
  );
}