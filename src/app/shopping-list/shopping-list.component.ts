import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit {


  constructor(private shoppingService: ShoppingListService) { }

  ingredients: Ingredient[];


  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingService.changingIng.subscribe(ings => {
      this.ingredients = ings;
    })
  }

  addItem(item: Ingredient) {
    // this.ingredients.push(item)
    this.shoppingService.addIngredient(item);

  }

}
