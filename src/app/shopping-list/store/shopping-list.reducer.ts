import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';
// import {ADD_INGREDIENT} from './shopping-list.action';
import * as ShoppingListActions from './shopping-list.action';



export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}


const intialState: State = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Bananna', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1

}

export function shoppingListReducer(state = intialState, action: ShoppingListActions.ShoppingListActions): State {

  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }
    case ShoppingListActions.UPDATE_INGREDIENT:

      // const ing = state.ingredients[action.payload.index];
      // const updatedIng = {
      //   ...ing,
      //   ...action.payload.ingredient
      // }
      const ingCopy = [...state.ingredients];
      ingCopy[action.payload.index] = action.payload.ingredient;

      return {
        ...state,
        ingredients: ingCopy,
        editedIngredient: null,
        editedIngredientIndex: -1
      }

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ing, index) => index != action.payload),
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredient: {...state.ingredients[action.payload]},// <======== take a copy
        editedIngredientIndex: action.payload
      }
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1

      }

    default:
      return state;
  }

}
