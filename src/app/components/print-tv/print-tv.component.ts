import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TvType } from 'src/app/models/Tv';
import { GetMoviesService } from 'src/app/services/get-movies.service';

@Component({
  selector: 'app-print-tv',
  templateUrl: './print-tv.component.html',
  styleUrls: ['./print-tv.component.css']
})
export class PrintTvComponent {
  //Button prime ng Sort
  items: MenuItem[];
  longPage: number = 5;

  allTv: TvType[];
  pagenum: number = 1;
  pages: number = 0;
  avielble: boolean = false;
  allTvType: string = '';
  PageK: number = 0;
  constructor(private getService: GetMoviesService) {
    this.pages = 120;

    if (window.screen.width < 501) {
      this.longPage = 2;
    };
  }
  ngOnInit() {
    if (sessionStorage.getItem("pagenum") && sessionStorage.getItem("allTvType")) {
      this.PageK = parseInt(sessionStorage.getItem("pagenum")) * 5 - 1;
      this.pagenum = parseInt(sessionStorage.getItem("pagenum"));
      this.allTvType = sessionStorage.getItem("allMovieType");

      this.getService.followTv().subscribe(t => {
        this.allTv = t.results;

        setTimeout(() => {
          this.avielble = true
        }, 1300);
      })

      this.pagaNumFunc();

    }
    else {
      this.getService.getPopularTv(this.pagenum).subscribe(t => {
        this.allTv = t.results;
        console.log(t);
        this.allTvType = 'popular';
        setTimeout(() => {
          this.avielble = true
        }, 1300);
      })
      this.updatesessionStorage();

    }

    //buton short 
    this.items = [
      {
        label: 'top_rated', icon: 'pi ', command: () => {this.update("top_rated");}
      },
      {
        label: 'popular', icon: 'pi ', command: () => {this.update("popular");}
      },
      {
        label: 'airing_today', icon: 'pi ', command: () => {this.update("airing_today");}
      },
    ]
  }

  update(sort: string) {
    this.allTvType = sort;
    this.PageK=1;
    this.pagenum=1;
    this.pagaNumFunc();
  }

  async pagaNumFunc(a?, bool?: boolean) {

    if (bool) { this.pagenum = a.page + 1; }

    if (this.allTvType == "top_rated") { this.getService.getTop_ratedTv(this.pagenum); }
    else if (this.allTvType == "popular") { this.getService.getPopularTv(this.pagenum); }
    else if (this.allTvType == "airing_today") { this.getService.getAiring_today(this.pagenum) }
    setTimeout(() => {
      this.avielble = false;

      this.avielble = true;
      setTimeout(() => {
        const element = document.querySelector('.TvFlex');
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    }, 1300);

    this.updatesessionStorage();
  }

  updatesessionStorage() {
    sessionStorage.setItem("pagenum", this.pagenum.toString());
    sessionStorage.setItem("allTvType", this.allTvType);
  }
}
