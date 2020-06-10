import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.mdel';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService){}

    storeRecipes(){
      const token = this.authService.getToken();

      return this.http.put('https://ng-recipe-list-866af.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes());
    }

    getRecipes(){
      const token = this.authService.getToken();

      this.http.get('https://ng-recipe-list-866af.firebaseio.com/recipes.json?auth=' + token).pipe(
      map(
        (response: Response) => {
          const recipes: Recipe[] = JSON.parse(response.toString());
          for(let recipe of recipes){
            if(!recipe['ingredients']){
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
    }
}
