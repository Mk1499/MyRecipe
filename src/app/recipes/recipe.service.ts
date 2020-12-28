import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipes.model'

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();


  private recipes: Recipe[] = [
    new Recipe('Shawrma', 'this is recipe description', 'https://www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg', [
      new Ingredient('Meat', 2),
      new Ingredient('Fruit', 5)
    ])
    ,
    new Recipe('Kebda', 'this is recipe description', 'https://www.trafalgar.com/real-word/wp-content/uploads/sites/3/2020/09/kebda-beef-liver-sandwich.jpeg', [
      new Ingredient('French', 4),
      new Ingredient('Chieken', 3),

    ])
  ];
  constructor(private slSerivce: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngToShoppingList(ingredients: Ingredient[]) {
    this.slSerivce.addIngredients(ingredients);
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number,recipe:Recipe){
    this.recipes[index] = recipe ;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice())
  }

}
