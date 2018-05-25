import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddCityComponent } from './add-city/add-city.component';
import { ListCitiesComponent } from './list-cities/list-cities.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCityComponent,
    ListCitiesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
