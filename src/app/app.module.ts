import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {DishesComponent} from './components/dishes/dishes.component';
import {DishComponent} from './components/dish/dish.component';
import {AddDishComponent} from './components/add-dish/add-dish.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SearchDishComponent} from './components/search-dish/search-dish.component';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DishesComponent,
    DishComponent,
    AddDishComponent,
    SearchDishComponent,
    RangeSliderComponent,
    StarRatingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
