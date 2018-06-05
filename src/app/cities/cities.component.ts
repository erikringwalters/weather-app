import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { CITIES } from '../mock-cities'
import { CityService } from '../city.service';
import { WeatherService } from '../weather.service';
import { switchMap } from 'rxjs/operators';
import { ParamMap, ActivatedRoute } from '@angular/router';

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
    private weatherService: WeatherService) { }

  ngOnInit() {
    //Selects random city out of array
    this.selectedCity = this.cities[Math.floor(Math.random() * this.cities.length)];
    this.getCities();
    this.cityService.getCookie();
  }

  onSelect(city: City): void {
    this.selectedCity = city;
  }

  getCities(): void {
    this.cityService.getCities();
  }

  deleteCity(cities: City[], city: City): void {
    this.cityService.deleteCity(city);
  }
}
