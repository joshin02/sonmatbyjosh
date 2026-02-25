import fs from "fs";
import path from "path";
import matter from "gray-matter";

const recipesDir = path.join(process.cwd(), "content/recipes");

export type RecipeMedia =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; url: string; alt?: string };

export type Recipe = {
  slug: string;
  title: string;
  image: string;
  intro?: string;
  ingredients?: string[];
  instructions?: string[];
  media?: RecipeMedia[];
};

function normalizeListField(field: any): string[] {
  if (!field) return [];
  if (!Array.isArray(field)) return [];

  return field
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") return item.item || item.step || "";
      return "";
    })
    .map((s) => String(s).trim())
    .filter(Boolean);
}

function normalizeMedia(field: any): RecipeMedia[] {
  if (!Array.isArray(field)) return [];

  return field
    .map((m) => {
      if (!m || typeof m !== "object") return null;

      if (m.type === "image" && typeof m.src === "string" && m.src.trim()) {
        return { type: "image", src: m.src.trim(), alt: m.alt?.trim?.() || undefined } as RecipeMedia;
      }

      if (m.type === "video" && typeof m.url === "string" && m.url.trim()) {
        return { type: "video", url: m.url.trim(), alt: m.alt?.trim?.() || undefined } as RecipeMedia;
      }

      return null;
    })
    .filter(Boolean) as RecipeMedia[];
}

function readRecipeFile(fullPath: string) {
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return matter(fileContents).data as any;
}

export function getAllRecipes(): Recipe[] {
  if (!fs.existsSync(recipesDir)) return [];

  const files = fs
    .readdirSync(recipesDir)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  const recipes = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "");
    const fullPath = path.join(recipesDir, file);
    const data = readRecipeFile(fullPath);

    return {
      slug,
      title: (data.title ?? slug) as string,
      image: (data.image ?? "/img/placeholder.jpg") as string,
      intro: (data.intro ?? "") as string,
      ingredients: normalizeListField(data.ingredients),
      instructions: normalizeListField(data.instructions),
      media: normalizeMedia(data.media),
    } satisfies Recipe;
  });

  // Optional: keep stable order (alphabetical)
  recipes.sort((a, b) => a.title.localeCompare(b.title));

  return recipes;
}

export function getRecipeBySlug(slug: string): Recipe | null {
  const mdPath = path.join(recipesDir, `${slug}.md`);
  const mdxPath = path.join(recipesDir, `${slug}.mdx`);

  const fullPath = fs.existsSync(mdPath) ? mdPath : fs.existsSync(mdxPath) ? mdxPath : null;
  if (!fullPath) return null;

  const data = readRecipeFile(fullPath);

  return {
    slug,
    title: (data.title ?? slug) as string,
    image: (data.image ?? "/img/placeholder.jpg") as string,
    intro: (data.intro ?? "") as string,
    ingredients: normalizeListField(data.ingredients),
    instructions: normalizeListField(data.instructions),
    media: normalizeMedia(data.media),
  };
}