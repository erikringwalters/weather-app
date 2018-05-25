import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { CITIES } from '../mock-cities'
import { CityService } from '../city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})

export class CitiesComponent implements OnInit {

  cities = CITIES;

  selectedCity: City;

  constructor(private cityService: CityService) { }

  ngOnInit() {
    //Selects random city out of array
    this.selectedCity = this.cities[Math.floor(Math.random() * this.cities.length)];

    this.getCities();
  }

  onSelect(city: City): void {
    this.selectedCity = city;
  }

  getCities(): void {
    this.cities = this.cityService.getCities();
  }
}
