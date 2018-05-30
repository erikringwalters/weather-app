import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { CITIES } from '../mock-cities'
import { CityService } from '../city.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})

export class CitiesComponent implements OnInit {

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
  }

  onSelect(city: City): void {
    this.selectedCity = city;
    this.url = this.cityService.getUrlByCity(city);
  }

  getCities(): void {
    this.cityService.getCities();
  }
}
