import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipes.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  storeRecipes() {

    const url = "https://my-recipe-b08c5-default-rtdb.firebaseio.com/recipes.json";
    const recipes = this.recipeService.getRecipes();
    this.http.put(url, recipes).subscribe(res => {
      console.log("Update Recipes Res : ", res);
    })
  }

  //   Fetching Recipes without using interceptor
  // fetchRecipes(): Observable<Recipe[]> {
  //   return this.authService.user.pipe(
  //     take(1), // take only one user observable and unsuscribe automatically after that
  //     exhaustMap(user => { // take previous observable and create another one
  //       const url = "https://my-recipe-b08c5-default-rtdb.firebaseio.com/recipes.json";
  //       return this.http.get<Recipe[]>(url, {
  //         params: new HttpParams().set('auth', user.token) // better that {auth:user.token} what returns null error

  //       })
  //     }),
  //     map(recipes => {
  //       return recipes.map(recipe => {
  //         return { ...recipe, ingredients: recipe.ingredients || [] }
  //       })
  //     })
  //     ,
  //     tap(recipes => {
  //       this.recipeService.setRecipes(recipes);

  //     }, error => {
  //       console.error(error)
  //     })
  //   )

  // }

  // Fetching Recipes Using Interceptors

  fetchRecipes() {
    const url = "https://my-recipe-b08c5-default-rtdb.firebaseio.com/recipes.json";
    return this.http.get<Recipe[]>(url).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients || [] }
        })
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes)
      },err => {
        console.log("Error : ",err);

      })
    )
  }




}
