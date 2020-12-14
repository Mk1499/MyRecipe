import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipes.model';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  recipes:Recipe[] = [
    new Recipe('a teat Recipe','this is recipe description','https://www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg')
  ,
  new Recipe('a teat Recipe','this is recipe description','https://www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg')

  ]; 
  constructor() { }

  ngOnInit(): void {
  }

}
