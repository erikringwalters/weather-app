import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { CITIES } from '../mock-cities'

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  cities = CITIES;

  selectedCity: City;

  constructor() { }

  ngOnInit() {
    this.selectedCity = this.cities[1];
  }

  onSelect(city: City): void {
    this.selectedCity = city;
  }
}
