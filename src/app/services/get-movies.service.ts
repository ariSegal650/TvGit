import { NgIfContext } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieTypes } from '../models/movieT';

@Injectable({
  providedIn: 'root'
})
export class GetMoviesService {
  movie: BehaviorSubject<MovieTypes>;
 // public pageNum:number=1;
  constructor(private http: HttpClient) {
   // this.movie = new BehaviorSubject(this.http.get("https://api.themoviedb.org/3/discover/movie?api_key=1e49ce8a1c5569898e58701cafb843d3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"));


  }

  getMovie(pageNum): Observable<any>{
   
    return this.http.get("https://api.themoviedb.org/3/discover/movie?api_key=1e49ce8a1c5569898e58701cafb843d3&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page="+pageNum+"&with_watch_monetization_types=flatrate");
   //return this.movie.getValue()
  }
  getAllDetails(id:string,media_type:string):Observable<any>{
    return this.http.get("https://api.themoviedb.org/3/"+media_type+"/"+id+"?api_key=1e49ce8a1c5569898e58701cafb843d3&language=en-US")
                         
  }
  getAllDetails1(id:string):Observable<any>{
    return this.http.get("https://api.themoviedb.org/3/movie/"+id+"?api_key=1e49ce8a1c5569898e58701cafb843d3&language=en-US")
                         
  }
  getPopularMovies(pageNum:number):Observable<any>{
    return this.http.get("https://api.themoviedb.org/3/trending/movie/week?api_key=1e49ce8a1c5569898e58701cafb843d3&page="+pageNum)
  }
  getSearch(serch:string,pageNum:number):Observable<any>{
    return this.http.get("https://api.themoviedb.org/3/search/multi?api_key=1e49ce8a1c5569898e58701cafb843d3&language=en-US&query="+serch+"&page="+pageNum+"&include_adult=false")
  }
  getVidow(id){
    return this.http.get("https://api.themoviedb.org/3/movie/"+id+"/videos?api_key=1e49ce8a1c5569898e58701cafb843d3&language=en-US")
  }
}
