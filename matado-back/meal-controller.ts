import { Meal } from '../matado-core/model.ts';

const mealsFilePath = "./meals.json";

async function readMealsFile(): Promise<Meal[]> {
  const decoder = new TextDecoder("utf-8");
  const fileStr = decoder.decode(await Deno.readAll(await Deno.open(mealsFilePath)));
  return JSON.parse(fileStr);
}

async function writeMealsFile(meals: Meal[]) {
  const encoder = new TextEncoder(); // to convert a string to Uint8Array
  await Deno.writeFile(mealsFilePath, encoder.encode(JSON.stringify(meals)));
}

export async function getMeals(context: any) {
  context.response.body = await readMealsFile();
}

export async function getMeal(context: any) {
  const id = context.params.id
  const meals: Meal[] = await readMealsFile();
  context.response.body = meals.find(meal => meal.id.toString() === id);
}

export async function addMeal(context: any) {
  const meal = await context.request.body().value;
  console.log("meal", meal);
  const meals: Meal[] = await readMealsFile();
  const id = meals.reduce((previous, current) => current.id > previous.id ? current : previous).id + 1;
  meal.id = id;
  meals.push(meal);
  await writeMealsFile(meals);
  context.response.status = 201;
  context.response.body = id;
}

export async function updateMeal(context: any) {
  const id = context.params.id;
  const meal = await context.request.body().value;
  const meals: Meal[] = await readMealsFile();
  const oldMeal = meals.find(m => m.id.toString() === id);
  if (oldMeal) {
    meals.splice(meals.indexOf(oldMeal));
    meal.id = id;
    meals.push(meal);
    await writeMealsFile(meals);
    context.response.body = meal;
  }
}

export async function deleteMeal(context: any) {
  const id = context.params.id;
  let meals: Meal[] = await readMealsFile();
  meals = meals.filter(meal => meal.id.toString() !== id);
  await writeMealsFile(meals);
}
