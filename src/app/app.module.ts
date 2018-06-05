import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddCityComponent } from './add-city/add-city.component';
import { CityDetailComponent } from './city-detail/city-detail.component';
import { CitiesComponent } from './cities/cities.component';
import { AppRoutingModule } from './/app-routing.module';
import { CityService } from './city.service';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    AddCityComponent,
    CityDetailComponent,
    CitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
