import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.mdel';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Tasty Schnepzil', 'A Super-tasty Schnizel - just awesome!', 'https://images.immediate.co.uk/production/volatile/sites/2/2017/11/Zaalouk-with-crispy-halloumi-527ab3c.jpg?webp=true&quality=90&crop=5px%2C1229px%2C2204px%2C948px&resize=940%2C399',
    [
      new Ingredient('Meat',1),
      new Ingredient('French Fries', 20)
    ]),
    new Recipe('Big Fat Burger!', 'What else do you say?', 'https://images.immediate.co.uk/production/volatile/sites/2/2017/11/Zaalouk-with-crispy-halloumi-527ab3c.jpg?webp=true&quality=90&crop=5px%2C1229px%2C2204px%2C948px&resize=940%2C399',
    [
      new Ingredient('Buns',2),
      new Ingredient('Meat', 1)
    ])
  ];

  constructor(private slServive: ShoppingListService){}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slServive.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
