import { Subscription } from 'rxjs';
// import { ShoppingListService } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Store } from '@ngrx/store';
import * as ShoppingListAction from '../store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;

  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;



  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    // subscribe on state data of shopping list reducer using NgRX
    this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.editedItemIndex = stateData.editedIngredientIndex;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false;
      }

    })
    // this.subscription = this.shoppingService.startedEditing.subscribe((index: number) => {

    //   this.editedItem = this.shoppingService.getOneIngredient(index);

    // })
  }

  onSubmit(form: NgForm) {

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount)

    if (this.editMode) {
      // this.shoppingService.updateIngriednts(this.editedItemIndex, newIngredient)
      this.store.dispatch(new ShoppingListAction.UpdateIngredients({ ingredient: newIngredient, index: this.editedItemIndex }))
    }
    else {
      // this.shoppingService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient))
    }

    this.editMode = false;

    form.reset();

    // const ingName: string = this.nameInputRef.nativeElement.value;
    // const ingAmount: number = this.amountInputRef.nativeElement.value;
    // this.nameInputRef.nativeElement.value = '';
    // this.amountInputRef.nativeElement.value= null;
    // this.ingredientAdded.emit(newIngredient);
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
    this.store.dispatch(new ShoppingListAction.StopEdit())
  }

  onDelete() {
    // this.shoppingService.deleteIngredient(this.editedItemIndex);(
    this.store.dispatch(new ShoppingListAction.DeleteIngredients(this.editedItemIndex))
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
