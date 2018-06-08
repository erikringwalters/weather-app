import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCityComponent } from './add-city/add-city.component'
import { CitiesComponent } from './cities/cities.component';
import { CityDetailComponent } from './city-detail/city-detail.component';

const routes: Routes = [
  { path: 'add-city', component: AddCityComponent },
  { path: 'cities', component: CitiesComponent },
  { path: 'city/:id', component: CityDetailComponent },
  { path: 'city', component: CityDetailComponent },
  { path: '', redirectTo: '/city', pathMatch: 'full' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
