import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {


  constructor(private shoppingService: ShoppingListService) { }

  ingredients: Ingredient[];
  private igChangeSub: Subscription;



  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.igChangeSub = this.shoppingService.changingIng.subscribe(ings => {
      this.ingredients = ings;
    })
  }

  addItem(item: Ingredient) {
    // this.ingredients.push(item)
    this.shoppingService.addIngredient(item);
  }

  onEditItem(index:number){
    this.shoppingService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe()
  }

}
