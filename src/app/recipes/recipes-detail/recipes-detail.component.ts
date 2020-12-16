import { Recipe } from './../recipes.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  @Input('recipe') recipe: Recipe;
  constructor() { }

  ngOnInit(): void {
  }

}
