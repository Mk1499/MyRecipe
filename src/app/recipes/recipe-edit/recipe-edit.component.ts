import { Subscription } from 'rxjs';
import { Recipe } from './../recipes.model';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';



@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit , OnDestroy{

  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  subscription:Subscription

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
   this.subscription =   this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }

  private initForm() {
    const recipe = this.recipeService.getRecipe(this.id);

    let recipeName = '';
    let recImagePath = '';
    let recDesc = '';
    let recipeIngredients = new FormArray([])

    if (this.editMode) {
      recipeName = recipe.name;
      recImagePath = recipe.imagePath;
      recDesc = recipe.description;
      if (recipe['ingredients']) {
        for (let ing of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              amount: new FormControl(ing.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recImagePath, Validators.required),
      'description': new FormControl(recDesc, Validators.required),
      'ingredient': recipeIngredients
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredient')).controls
  }

  onAddIng() {
    (<FormArray>this.recipeForm.get('ingredient')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onSubmit() {
    console.log("Fome : ", this.recipeForm);
    const recForm = this.recipeForm.value;
    const newRecipe = new Recipe(recForm.name, recForm.description, recForm.imagePath, recForm.ingredient)

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    }
    else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.onCancel()
  }

  onCancel() {
    this.router.navigate(['../'], {
      relativeTo: this.route
    })
  }
  deleltIng(index: number) {
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }


}
