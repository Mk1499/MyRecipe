import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Bananna', 10)
  ];

  changingIng = new EventEmitter<Ingredient[]>()


  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
    this.changingIng.emit(this.ingredients.slice());
    console.log("New List : ", this.ingredients);
  }

  addIngredients(ings : Ingredient[]){
    // for(let ing of ings ){
    //   this.addIngredient(ing);
    // }
    this.ingredients.push(...ings);
    this.changingIng.emit(this.ingredients.slice());
  }

  constructor() { }
}
