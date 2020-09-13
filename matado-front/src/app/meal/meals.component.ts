import { Component, OnInit } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from "@angular/animations";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { PageEvent } from "@angular/material/paginator";
import { Meal, MealType, Ingredient, Season } from '../../../../matado-core/model';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0, "margin-top": "10px" }), stagger('300ms', animate('600ms ease', style({ opacity: 1, "margin-top": 0 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0, "margin-top": "500px" })),
      { optional: true }
    )
  ])
]);

@Component({
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss'],
  animations: [listAnimation]
})
export class MealsComponent implements OnInit {

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

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    const searchableWordsSet = new Set<string>();
    this.http.get<Ingredient[]>("/api/ingredients").subscribe(ingredients => {
      this.ingredients = ingredients;
      this.http.get<Meal[]>("/api/meals").pipe(
        map(meals => meals.map((meal: Meal) => ({
          ...meal,
          seasons: meal.ingredients
            .map(ingredient => this.ingredients.find(ing => ing.name === ingredient))
            .filter(ingredient => ingredient && ingredient.seasons && ingredient.seasons.length)
            .map(ingredient => ingredient.seasons)
            .reduce((intersection, seasons) => intersection.filter(season => seasons.indexOf(season) >= 0), Object.values(Season))
        })))).subscribe(meals => {
        this.meals = meals;
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
      });
    });
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
    this.searchChange(words.join(", ") + ", ");
    return words.join(", ") + ", ";
  }
}
