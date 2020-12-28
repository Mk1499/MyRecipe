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

  changingIng = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>();

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getOneIngredient(index: number): Ingredient {
    return this.ingredients[index]
  }

  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
    this.changingIng.next(this.ingredients.slice());
    console.log("New List : ", this.ingredients);
  }

  addIngredients(ings: Ingredient[]) {
    // for(let ing of ings ){
    //   this.addIngredient(ing);
    // }
    this.ingredients.push(...ings);
    this.changingIng.next(this.ingredients.slice());
  }

  updateIngriednts(index:number,newIng:Ingredient){
    this.ingredients[index]= newIng;
    this.changingIng.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.changingIng.next(this.ingredients.slice());
  }

  constructor() { }
}
