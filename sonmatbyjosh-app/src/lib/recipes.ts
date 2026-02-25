import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Recipe = {
  slug: string;
  title: string;
  image: string;
};

const recipesDir = path.join(process.cwd(), "content/recipes");

export function getAllRecipes(): Recipe[] {
  const files = fs.readdirSync(recipesDir);

  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(recipesDir, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      image: data.image,
    };
  });
}