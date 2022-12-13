import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieDeatails } from 'src/app/models/movieT';
import { GetMoviesService } from 'src/app/services/get-movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  id: string;
  media_type: string;
  avielble: boolean = false;
  movieD: any
  constructor(private route: ActivatedRoute, private GetMovieService: GetMoviesService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.media_type = this.route.snapshot.paramMap.get('media_type')
    console.log(this.id);
    if (this.media_type !=null) { this.getDatasearch(); }
   else if (this.id != "") { this.getDataMovie() };
   
  }
  async getDataMovie() {
    await this.GetMovieService.getAllDetails1(this.id).subscribe(h => {
      this.movieD = h;
      console.log(this.movieD);
      this.avielble = true

    })
    await this.GetMovieService.getVidow(this.id).subscribe(v=>{
      console.log(v);
      console.log(587);
      
    })
  }
  async getDatasearch() {
    await this.GetMovieService.getAllDetails(this.id,this.media_type).subscribe(h => {
      this.movieD = h;
      console.log(this.movieD);
      this.avielble = true

    })
  }

}
