import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { PrintMoviesComponent } from './components/print-movies/print-movies.component';

const routes: Routes = [
  {path:"" , component:PrintMoviesComponent},
  {path:"main",component:PrintMoviesComponent},
  {path:"details/:id", component:MovieDetailsComponent},
  {path:"details/:id/:media_type", component:MovieDetailsComponent},
  {path:"**", redirectTo:"main" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
