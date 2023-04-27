import { Component, OnInit } from '@angular/core';
import { GetMoviesService } from 'src/app/services/get-movies.service';
import { MovieTypes } from '../../models/movieT';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { searchTypes } from 'src/app/models/search';


@Component({
  selector: 'app-print-movies',
  templateUrl: './print-movies.component.html',
  styleUrls: ['./print-movies.component.css']
})
export class PrintMoviesComponent {
  items: MenuItem[];
  allMovies: MovieTypes[];
  SerchType1: searchTypes = { searchInput: "",page:1 };
  allMovieType: string = '';
  pagenum: number = 1;
  pages: number = 0;
  opi: number = 25;
  avielble: boolean = false;
  longpage: number = 5;
  PageK: number = 0;
  constructor(private GetMoviesServices: GetMoviesService, private route: ActivatedRoute) {
    this.allMovieType = 'popularity';
    this.pages = 120;

    if (window.screen.width < 501) { this.longpage = 2; };

  }

  ngOnInit() {
    this.GetMoviesServices.followMovie().subscribe(j => {
      this.allMovies = j.results as MovieTypes[];
      console.log(j.total_results / 20);
      setTimeout(() => {
        this.avielble = true
      }, 1300);
    });

    if (sessionStorage.getItem("pagenum") && sessionStorage.getItem("allMovieType")) {
      this.PageK = parseInt(sessionStorage.getItem("pagenum")) * 5 - 1;
      this.pagenum = parseInt(sessionStorage.getItem("pagenum"));
      this.allMovieType = sessionStorage.getItem("allMovieType");
      this.SerchType1.searchInput = sessionStorage.getItem("search");

      console.log(55);
    }
    else {

      this.allMovieType = 'popularity';
      this.pagenum = 1;
    }

    this.route.params.subscribe(queryParams1 => {

      this.SerchType1 = queryParams1 as searchTypes;
      
      if (this.SerchType1.searchInput) {
        this.allMovieType = "search";
        console.log(queryParams1 as searchTypes[], 11);
        this.pagenum=this.SerchType1.page;
      //  this.SerchType1 = queryParams1 as searchTypes;
      }
      this.pagaNumFunc();
    });

    this.items = [
      {
        label: 'popularity', icon: 'pi ', command: () => { this.update("popularity"); }
      },
      {
        label: 'top_rated', icon: 'pi ', command: () => { this.update("top_rated"); }
      },
      { label: 'discover', icon: 'pi ', command: () => { this.update("discover"); } },
    ]
  }

  update(sort: string) {
    this.allMovieType = sort;
    this.PageK = 1;
    this.pagenum = 1;
    this.pagaNumFunc();
  }


  // SearchF() {
  //   if (this.SerchType) {
  //     this.allMovieType = 'Search';
  //     sessionStorage.setItem("SerchType", this.SerchType);
  //     this.pagaNumFunc();
  //   }
  // }



  async pagaNumFunc(a?, bool?: boolean) {

    if (bool) { this.pagenum = a.page + 1; console.log(55555); }

    if (this.allMovieType == 'popularity') { this.GetMoviesServices.getPopularMovies(this.pagenum); }
    else if (this.allMovieType == 'top_rated') { this.GetMoviesServices.getTop_rated(this.pagenum); }
    else if (this.allMovieType == 'discover') { this.GetMoviesServices.getMovieDiscover(this.pagenum); }
    else if (this.allMovieType == 'search') {
      this.GetMoviesServices.getSearch(this.SerchType1.searchInput, this.pagenum);
       sessionStorage.setItem("search", this.SerchType1.searchInput);console.log(3333);
       
    }

    setTimeout(() => {
      this.avielble = true;
      setTimeout(() => {
        const element = document.querySelector('.MoviesFlex');
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    }, 1200);

    this.updatesessionStorage();
  }

  updatesessionStorage() {
    sessionStorage.setItem("pagenum", this.pagenum.toString());
    sessionStorage.setItem("allMovieType", this.allMovieType);
  }





}
