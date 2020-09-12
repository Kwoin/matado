import { Component, OnInit } from '@angular/core';
import Ingredients from '../assets/ingredients.json';
import Meals from '../assets/meals.json';
import { PageEvent } from "@angular/material/paginator";

export type MealType = "plat" | "entrée" | "dessert";
export const MealType = {
  plat   : "plat" as MealType,
  entree : "entrée" as MealType,
  dessert: "dessert" as MealType,
}

export type Season = "printemps" | "été" | "automne" | "hiver";
export const Season = {
  printemps: "printemps" as Season,
  ete      : "été" as Season,
  automne  : "automne" as Season,
  hiver    : "hiver" as Season,
}

export interface Ingredient {
  name: string,
  seasons: Season[]
}

export interface Meal {
  name: string,
  type: MealType,
  ingredients: string[],
  tags: string[],
  seasons: Season[],
  image?: string
}

@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ingredients: Ingredient[];
  meals: Meal[];
  tags: string[];
  _meals: Meal[];
  _mealsToDisplay: Meal[];
  randomMeal: Meal;
  search: string;
  page = 0;
  itemPerPage = 10;
  searchableWords: string[];
  _searchableWords: string[];

  ngOnInit(): void {
    const searchableWordsSet = new Set<string>();
    this.ingredients = JSON.parse(JSON.stringify(Ingredients));
    this.meals = JSON.parse(JSON.stringify(Meals))
      .map((meal: Meal) => ({
        ...meal,
        seasons: meal.ingredients
          .map(ingredient => this.ingredients.find(ing => ing.name === ingredient))
          .filter(ingredient => ingredient && ingredient.seasons && ingredient.seasons.length)
          .map(ingredient => ingredient.seasons)
          .reduce((intersection, seasons) => intersection.filter(season => seasons.indexOf(season) >= 0), Object.values(Season))
      }))
    const tags = new Set<string>(
      this.meals.map(meal => meal.tags)
        .reduce((all, arr) => all.concat(arr), [])
    );
    this.tags = [...tags];
    this.meals.forEach(meal => meal.ingredients.forEach(ingredient => searchableWordsSet.add(ingredient)));
    this.tags.forEach(tag => searchableWordsSet.add(tag));
    Object.values(MealType).forEach(mealType => searchableWordsSet.add(mealType));
    Object.values(Season).forEach(season => searchableWordsSet.add(season));
    this.searchableWords = [...searchableWordsSet];
    this._searchableWords = this.searchableWords.slice();
    this._meals = this.meals;
    this.computeMealsToDisplay();
  }

  computeMeals() {
    const searchWords = this.searchWords();
    let meals = this.meals.slice();
    searchWords.forEach(searchWord => meals = this.filterMeals(meals, searchWord));
    this._meals = meals;
    this.computeMealsToDisplay();
  }

  filterMeals(meals: Meal[], searchWord: string) {
    return meals.filter(meal => meal.name.toLowerCase().indexOf(searchWord) >= 0
      || meal.type.indexOf(searchWord) >= 0
      || meal.seasons.some(season => season.indexOf(searchWord) >= 0)
      || meal.ingredients.some(ingredient => ingredient.indexOf(searchWord) >= 0)
      || meal.tags.some(tag => tag.indexOf(searchWord) >= 0))
  }

  computeMealsToDisplay() {
    const startIndex = this.page * this.itemPerPage;
    const endIndex = startIndex + this.itemPerPage;
    this._mealsToDisplay = this._meals.slice(startIndex, endIndex);
  }

  selectRandomMeal() {
    const index = Math.floor(Math.random() * this._meals.length);
    this.randomMeal = this._meals[index];
  }

  returnToMeals() {
    this.randomMeal = null;
  }

  pageChange(page: PageEvent) {
    this.page = page.pageIndex;
    this.computeMealsToDisplay();
  }

  searchChange(searchInputValue: string) {
    this.search = searchInputValue;
    const searchWords = this.searchWords();
    const lastWord = searchWords.pop();
    this._searchableWords = this.searchableWords.filter(word => word.startsWith(lastWord))
      .filter(word => searchWords.indexOf(word) < 0)
    this.computeMeals();
  }

  private searchWords(): string[] {
    return this.search ? this.search.toLowerCase().split(/\s*[,;]\s*/) : [];
  }

  addSearchWord = (word: string) => {
    const words = this.searchWords();
    words.pop();
    words.push(word);
    this.searchChange(words.join(", "));
    return words.join(", ");
  }
}
