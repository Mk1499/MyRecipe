import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipes.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

  @Input('recipe') recipe: Recipe;
  @Input('index') index: number;
  // @Output('selectRecipe') selectRecipe = new EventEmitter<Recipe>()
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
  }
}
