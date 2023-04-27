import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { PrintMoviesComponent } from './components/print-movies/print-movies.component';
import { PrintTvComponent } from './components/print-tv/print-tv.component';

const routes: Routes = [
  {path:"" , component:MainComponent},
  {path:"main",component:MainComponent},
  {path:"movies",component:PrintMoviesComponent},
  {path:"tv",component:PrintTvComponent},
  {path:"details/:id", component:MovieDetailsComponent},
  {path:"details/:id/:media_type", component:MovieDetailsComponent},
  {path:"search/:searchInput/:page",component:PrintMoviesComponent},
  {path:"**", redirectTo:"main" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
