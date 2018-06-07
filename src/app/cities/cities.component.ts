import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { CITIES } from '../mock-cities'
import { CityService } from '../city.service';
import { WeatherService } from '../weather.service';
import { switchMap } from 'rxjs/operators';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})

export class CitiesComponent implements OnInit {

  route: ActivatedRoute;
  cities = CITIES;

  selectedCity: City;
  url: string;

  constructor(
    private cityService: CityService,
    private weatherService: WeatherService,
    private router: Router
  ) { }

  ngOnInit() {
    //Selects random city out of array
    this.selectedCity = this.cities[Math.floor(Math.random() * this.cities.length)];
    this.cities = this.cityService.getCities();
    if(!this.canAddCity()) {
      document.getElementById("addCityButton").className = "hide";
    }
  }

  canAddCity(): boolean {
    if(this.cityService.arrayIsMaxSize(
      this.cityService.getCities(),
       this.cityService.maxSize)) {
        return false;
       }
    else {
      return true;
    }
  }

  onSelect(city: City): void {
    this.selectedCity = city;
  }

  deleteCity(cityId: number): void {
    this.cityService.deleteCity(cityId);
    this.cities = this.cityService.getCities();
    //Reroute to cities
    this.router.navigate( ['../cities'] )
  }

}
