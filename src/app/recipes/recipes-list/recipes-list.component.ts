import { Recipe } from './../recipes.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {


  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Shawrma', 'this is recipe description', 'https://www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg')
    ,
    new Recipe('Kebda', 'this is recipe description', 'https://www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe:Recipe){

    this.recipeWasSelected.emit(recipe);
  }

}
