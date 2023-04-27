import { Component } from '@angular/core';
import { MovieTypes } from 'src/app/models/movieT';
import { TvType } from 'src/app/models/Tv';
import { GetMoviesService } from 'src/app/services/get-movies.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  allMovies: MovieTypes[];
  allTv:TvType[];
  constructor(private getService: GetMoviesService) {
  sessionStorage.clear();
       console.log("main");
    
  }
  async ngOnInit() {
    this.getService.followMovie().subscribe(f=>{
      this.allMovies = f.results as MovieTypes[];
    })
   await this.getService.getPopularMovies(1).subscribe(m => {
      this.allMovies = m.results as MovieTypes[];
      console.log(this.allMovies);
      
    }).unsubscribe()
      ///tv
    this.getService.followTv().subscribe(f=>{
      this.allTv = f.results as TvType[];
    })
    this.getService.getPopularTv(1).subscribe(t=>{
      console.log(this.allTv);
      this.allTv = t.results as TvType[];
      console.log(this.allTv);
     
    }).unsubscribe();
  }
}
