import { transition } from '@angular/animations';
import { NgIfContext } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetMoviesService {
  movie: BehaviorSubject<object>;
  tv: BehaviorSubject<object>;

  constructor(private http: HttpClient) {
    this.tv = new BehaviorSubject({ page: 0, results: [], total_pages: 0, total_results: 0 });
    this.movie = new BehaviorSubject({ page: 0, results: [], total_pages: 0, total_results: 0 });
  }

  ///movie//
  followMovie(): Observable<any> {
  return this.movie
  }

  getPopularMovies(pageNum: number): Observable<any> {
    this.http.get("https://api.themoviedb.org/3/trending/movie/week?api_key=1e49ce8a1c5569898e58701cafb843d3&page=" + pageNum).subscribe(m => {
      this.movie.next(m)
    })
    return this.movie;
  }

  async getMovieDiscover(pageNum) {
    await this.http.get("https://api.themoviedb.org/3/discover/movie?api_key=1e49ce8a1c5569898e58701cafb843d3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=" + pageNum + "&with_watch_monetization_types=flatrate").subscribe(m => {
      this.movie.next(m);
    });

  }

  async getTop_rated(pageNum: number) {
    await this.http.get("https://api.themoviedb.org/3/movie/top_rated?api_key=1e49ce8a1c5569898e58701cafb843d3&language=en-US&page=" + pageNum).subscribe(m => {
      this.movie.next(m)
    })
  }

  //Tv///

  followTv(): Observable<any> {
    return this.tv;
  }

  getPopularTv(pageNum: number): Observable<any> {
    this.http.get("https://api.themoviedb.org/3/tv/popular?api_key=1e49ce8a1c5569898e58701cafb843d3&language=en-US&page=" + pageNum).subscribe(t => {
      this.tv.next(t);
    });
    return this.tv;
  }

  async getTop_ratedTv(pageNum: number) {
    await this.http.get("https://api.themoviedb.org/3/tv/top_rated?api_key=1e49ce8a1c5569898e58701cafb843d3&language=en-US&page=" + pageNum).subscribe(t => {
      this.tv.next(t);
    });
  }
  async getAiring_today(pageNum: number) {
    await this.http.get("https://api.themoviedb.org/3/tv/airing_today?api_key=1e49ce8a1c5569898e58701cafb843d3&language=en-US&page=" + pageNum).subscribe(t => {
      this.tv.next(t);
    });
  }
  async getNewTv(pageNum: number) {
    await this.http.get("https://api.themoviedb.org/3/tv/latest?api_key=1e49ce8a1c5569898e58701cafb843d3&language=en-US").subscribe(t => {
      this.tv.next(t);
    });
  }


  async getSearch(serch: string, pageNum: number) {
   await  this.http.get("https://api.themoviedb.org/3/search/multi?api_key=1e49ce8a1c5569898e58701cafb843d3&language=en-US&query=" + serch + "&page=" + pageNum + "&include_adult=false").subscribe(s=>{
      this.movie.next(s);
     })
  }
  getVideo(id: string, media_type: string): Observable<any> {
    return this.http.get("https://api.themoviedb.org/3/" + media_type + "/" + id + "/videos?api_key=1e49ce8a1c5569898e58701cafb843d3&language=en-US")
       
  }
  
  getAllDetails(id: string, media_type: string): Observable<any> {
    return this.http.get("https://api.themoviedb.org/3/" + media_type + "/" + id + "?api_key=1e49ce8a1c5569898e58701cafb843d3&language=en-US")
  }
}
