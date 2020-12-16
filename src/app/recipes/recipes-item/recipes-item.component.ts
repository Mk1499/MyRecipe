import { Recipe } from './../recipes.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

  @Input('recipe') recipe: Recipe;
  @Output('selectRecipe') selectRecipe = new EventEmitter<Recipe>()
  constructor() { }

  ngOnInit(): void {
    console.log("R Data : ", this.recipe);
  }
  onSelected() {
    this.selectRecipe.emit()
  }
}
