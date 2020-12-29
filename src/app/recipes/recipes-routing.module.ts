import { AuthGuard } from './../auth/auth.guard';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes:Routes = [
  {
    path: '', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: "new", component: RecipeEditComponent },
      { path: ":id", component: RecipesDetailComponent, resolve: [RecipesResolverService] },
      { path: ":id/edit", component: RecipeEditComponent, resolve: [RecipesResolverService] },
    ],
    canActivate:[AuthGuard]
  },
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRouting{

}
