import { Component, Input, OnInit } from '@angular/core';
import { Meal } from "./app.component";

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent implements OnInit {

  @Input() meal: Meal;

  constructor() { }

  ngOnInit(): void {
  }

}
