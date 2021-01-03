import { Ingredient } from './../shared/ingredient.model';
import { DataStorageService } from './../shared/data-storage.service';
import { Subject } from 'rxjs';
// import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipes.model'
import { Store } from '@ngrx/store';
import * as ShoppingListAction from '../shopping-list/store/shopping-list.action';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();


  private recipes: Recipe[] = [
    // new Recipe('Shawrma', 'this is recipe description', 'https://www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg', [
    //   new Ingredient('Meat', 2),
    //   new Ingredient('Fruit', 5)
    // ])
    // ,
    // new Recipe('Kebda', 'this is recipe description', 'https://www.trafalgar.com/real-word/wp-content/uploads/sites/3/2020/09/kebda-beef-liver-sandwich.jpeg', [
    //   new Ingredient('French', 4),
    //   new Ingredient('Chieken', 3),

    // ])
  ];
  constructor(private store:Store<fromApp.AppState>) { }

  setRecipes(recipes: Recipe[]) {

    this.recipes = recipes;
    this.recipesChanged.next(recipes);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngToShoppingList(ingredients: Ingredient[]) {
    // this.slSerivce.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListAction.AddIngredients(ingredients))
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }

}
