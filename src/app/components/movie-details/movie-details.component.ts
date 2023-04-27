import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GetMoviesService } from 'src/app/services/get-movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  id: string;
  video: any;
  media_type: string = "movie";
  avielble: boolean = false;
  avielbleVideo: boolean = false;
  movieD: any
  constructor(private route: ActivatedRoute, private GetMovieService: GetMoviesService, private sanitizer: DomSanitizer) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.route.snapshot.paramMap.get('media_type')) { this.media_type = this.route.snapshot.paramMap.get('media_type'); }
    //else if (this.id != "") { this.getDataMovie() };
    this.getDataMovie();

  }

  async getDataMovie() {
    await this.GetMovieService.getAllDetails(this.id, this.media_type).subscribe(h => {
      this.movieD = h;
      this.avielble = true;
      this.getVideo();
    }, (error => {
      console.error('Request failed with error')
    }))
  }
  async getVideo() {
    this.GetMovieService.getVideo(this.id, this.media_type).subscribe(v => {
      if (v.results[0] != null) {
        
        this.video = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + v.results[0].key);
        this.avielbleVideo = true
      }
      }, (error => {
        console.error('Request failed with error')
      }))
  
}

}
