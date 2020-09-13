import { Ingredient } from '../matado-core/model.ts';

const ingredientsFilePath = "./ingredients.json";

async function readIngredientsFile(): Promise<Ingredient[]> {
  const decoder = new TextDecoder("utf-8");
  const fileStr = decoder.decode(await Deno.readAll(await Deno.open(ingredientsFilePath)));
  return JSON.parse(fileStr);
}

async function writeIngredientsFile(ingredients: Ingredient[]) {
  const encoder = new TextEncoder(); // to convert a string to Uint8Array
  await Deno.writeFile(ingredientsFilePath, encoder.encode(JSON.stringify(ingredients)));
}

export async function getIngredients(context: any) {
  context.response.body = await readIngredientsFile();
}

export async function getIngredient(context: any) {
  const id = context.params.id;
  const ingredients: Ingredient[] = await readIngredientsFile();
  context.response.body = ingredients.find(ingredient => ingredient.id.toString() === id);
}

export async function addIngredient(context: any) {
  const ingredient: Ingredient = await context.request.body().value;
  const ingredients: Ingredient[] = await readIngredientsFile();
  const id = ingredients.reduce((previous, current) => current.id > previous.id ? current : previous).id + 1;
  ingredient.id = id;
  ingredients.push(ingredient);
  await writeIngredientsFile(ingredients);
  context.response.status = 201;
  context.response.body = id;
}

export async function updateIngredient(context: any) {
  const id = context.params.id;
  const ingredient: Ingredient = await context.request.body().value;
  const ingredients: Ingredient[] = await readIngredientsFile();
  const oldIngredient = ingredients.find(i => i.id.toString() === id);
  if (oldIngredient) {
    ingredients.splice(ingredients.indexOf(oldIngredient));
    ingredient.id = id;
    ingredients.push(ingredient);
    await writeIngredientsFile(ingredients);
    context.response.body = ingredient;
  }
}

export async function deleteIngredient(context: any) {
  const id = context.params.id;
  let ingredients: Ingredient[] = await readIngredientsFile();
  ingredients = ingredients.filter(ingredient => ingredient.id.toString() !== id);
  await writeIngredientsFile(ingredients);
}
