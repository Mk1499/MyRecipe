import { SharedModule } from './../shared/shared.module';
import { RecipeRouting } from './recipes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesItemComponent } from './recipes-item/recipes-item.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesComponent } from './recipes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations:[
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  // exports:[
  //   RecipesComponent,
  //   RecipesListComponent,
  //   RecipesDetailComponent,
  //   RecipesItemComponent,
  //   RecipeStartComponent,
  //   RecipeEditComponent,
  // ],
  imports:[
    RouterModule,
    // CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RecipeRouting,
    SharedModule
  ]
})
export class RecipesModule {

}
