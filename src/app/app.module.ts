import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PrintMoviesComponent } from './components/print-movies/print-movies.component';
import { HeaderComponent } from './components/header/header.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {SplitButtonModule} from 'primeng/splitbutton';
import {ButtonModule} from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { FormsModule } from '@angular/forms';
import {PaginatorModule} from 'primeng/paginator';
import { MainComponent } from './components/main/main.component';
import { PrintTvComponent } from './components/print-tv/print-tv.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    PrintMoviesComponent,
    HeaderComponent,
    MovieDetailsComponent,
    MainComponent,
    PrintTvComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    AccordionModule,
    SplitButtonModule,
    ButtonModule,
    BrowserAnimationsModule,
    ToastModule,
    FormsModule,
    PaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
