import Header from "@/components/header";
import { getAllRecipes } from "@/lib/recipes";

const PAGE_SIZE = 4;

export default function RecipesPage() {
  const recipes = getAllRecipes();
  const visibleRecipes = recipes.slice(0, PAGE_SIZE);

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
          {visibleRecipes.map((recipe) => (
            <div key={recipe.slug} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <p>{recipe.title}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}