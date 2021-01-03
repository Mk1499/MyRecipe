import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';


export const ADD_INGREDIENT = "[Shopping List] ADD_INGREDIENT";
export const ADD_INGREDIENTS = "[Shopping List] ADD_INGREDIENTS";
export const UPDATE_INGREDIENT = "[Shopping List] UPDATE_INTGREDIENT";
export const DELETE_INGREDIENT = "[Shopping List] DELETE_INTGREDIENT";
export const START_EDIT = "[Shopping List] START_EDIT";
export const STOP_EDIT = "[Shopping List] STOP_EDIT";



export class AddIngredient implements Action {
  readonly type: string = ADD_INGREDIENT;
  constructor(public payload: Ingredient) { }
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) { }
}
export class UpdateIngredients implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: { ingredient: Ingredient, index: number }) { }
}
export class DeleteIngredients implements Action {
  readonly type = DELETE_INGREDIENT;
  constructor(public payload: number) { }
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) { }
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}


export type ShoppingListActions = AddIngredients | AddIngredient | DeleteIngredients | UpdateIngredients | StopEdit | StartEdit
