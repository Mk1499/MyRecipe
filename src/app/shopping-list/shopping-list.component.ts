import { Ingredient } from './../shared/ingredient.model';
// import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.action';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {


  constructor(
    // private shoppingService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) { }

  ingredients: Observable<{
    ingredients: Ingredient[]
  }>;
  private igChangeSub: Subscription;
  private ingSbb: Subscription;



  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingService.getIngredients();
    // this.igChangeSub = this.shoppingService.changingIng.subscribe(ings => {
    //   alert("GE")
    //   this.ingredients = ings;
    // })
  }

  addItem(item: Ingredient) {
    // this.ingredients.push(item)
    // this.shoppingService.addIngredient(item);
  }

  onEditItem(index: number) {
    // this.shoppingService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }

  ngOnDestroy() {
    // this.igChangeSub.unsubscribe();
    // this.ingSbb.unsubscribe()
  }

}
