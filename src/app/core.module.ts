import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterService } from './auth/auth-interceptor.service';


@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    {
       provide: HTTP_INTERCEPTORS,
       useClass: AuthInterService,
      multi: true
    }
  ],

})
export class CoreModule {

}
