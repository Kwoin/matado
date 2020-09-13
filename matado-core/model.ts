export type MealType = "plat" | "entrée" | "dessert";
export const MealType = {
  plat   : "plat" as MealType,
  entree : "entrée" as MealType,
  dessert: "dessert" as MealType,
}

export interface Meal {
  id: number;
  name: string;
  type: MealType;
  ingredients: string[];
  tags: string[];
  seasons: Season[];
  image?: string;
}

export type Season = "printemps" | "été" | "automne" | "hiver";
export const Season = {
  printemps: "printemps" as Season,
  ete      : "été" as Season,
  automne  : "automne" as Season,
  hiver    : "hiver" as Season,
}

export interface Ingredient {
  id: number;
  name: string;
  seasons: Season[];
}

