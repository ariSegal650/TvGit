import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
a:number=0;
  langugeChange: boolean;
  searchInput:string='';
  page:number=1
  constructor() {
    this.langugeChange = false;



  }

  openLanguage() {
    this.langugeChange = !this.langugeChange;
    console.log(11);
    this.a=1;

  }
  changeL(langSelect: string) {
    this.langugeChange = false
  }


  @HostListener('document:click')
  clickout() {
    if (this.langugeChange==true &&this.a!=1) {
      this.langugeChange = false;      
    }
    else{
      this.a=0;
    }
  }
}
