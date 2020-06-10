import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AuthGurad } from '../auth/auth-guard.service';

const recipesRouts: Routes = [
  { path: '', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent, canActivate: [AuthGurad] },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGurad] }
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRouts)
  ],
  exports: [
    RouterModule,
  ],
  providers:[
    AuthGurad
  ]
})
export class RecipesRoutingModule{

}
