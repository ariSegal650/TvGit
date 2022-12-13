import { Component, OnInit } from '@angular/core';
import { GetMoviesService } from 'src/app/services/get-movies.service';
import { MovieTypes } from '../../models/movieT';
import { MenuItem } from 'primeng/api';
import { Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-print-movies',
  templateUrl: './print-movies.component.html',
  styleUrls: ['./print-movies.component.css']
})
export class PrintMoviesComponent {
  items: MenuItem[];
  allMovies: MovieTypes[];
  SerchType: string = '';
  allMovieType: string = '';
  pagenum: number = 1;
  constructor(private GetMoviesServices: GetMoviesService, private http: HttpClient) {
    this.allMovieType = 'popularity'
  }
  ngOnInit() {
    if (sessionStorage.getItem("pagenum") && sessionStorage.getItem("allMovieType")) {
      this.pagenum = parseInt(sessionStorage.getItem("pagenum"));
      this.allMovieType = sessionStorage.getItem("allMovieType");
      this.SerchType = sessionStorage.getItem("SerchType");
      this.pagaNumFunc() 
    }
    else {

      this.GetMoviesServices.getMovie(this.pagenum).subscribe(j => {
        console.log(j);
        this.allMovies = j.results as MovieTypes[];
      })
    }

    this.items = [
      {
        label: 'trending', icon: 'pi ', command: () => {
          this.update("trending");
        }
      },
      {
        label: 'new', icon: 'pi ', command: () => {
          this.update("new");
        }
      },

    ]
  }
  update(sort: string) {
    console.log(sort);
    if (sort == "trending") {
      this.allMovieType = 'trending';
      this.pagaNumFunc();
    }

  }
  save(severity: any) {
    console.log(severity);
  }

  SearchF() {
    if(this.SerchType){

      this.allMovieType = 'Search';
      sessionStorage.setItem("SerchType", this.SerchType);
      this.pagaNumFunc();
    }
    
  }



  async pagaNumFunc(a?, bool?: boolean) {
    if (bool == true) {

      this.pagenum = a.page + 1
      console.log(this.pagenum);
    }

    if (this.allMovieType == 'popularity') {
      this.GetMoviesServices.getMovie(this.pagenum).subscribe(j => {
        console.log(j);
        this.allMovies = (j.results as MovieTypes[]);
      })
    }
    else if (this.allMovieType == 'trending') {
      await this.GetMoviesServices.getPopularMovies(this.pagenum).subscribe(m => {
        this.allMovies = (m.results as MovieTypes[]);
      })

    }
    else if (this.allMovieType == 'Search') {
      await this.GetMoviesServices.getSearch(this.SerchType, this.pagenum).subscribe(s => {
        this.allMovies = (s.results as MovieTypes[]);
        console.log(s);

      })
    }

    this.updatesessionStorage();

  }
  updatesessionStorage() {
    sessionStorage.setItem("pagenum", this.pagenum.toString());
    sessionStorage.setItem("allMovieType", this.allMovieType);
  }





}
