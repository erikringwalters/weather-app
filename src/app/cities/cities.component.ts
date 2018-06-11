import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { CityService } from '../city.service';
import { WeatherService } from '../weather.service';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})

export class CitiesComponent implements OnInit {

  route: ActivatedRoute;

  selectedCity: City;
  url: string;

  constructor(
    private cityService: CityService,
    private weatherService: WeatherService,
    private router: Router
  ) { }

  cities(): City[] {
    return this.cityService.getCities();
  }

  ngOnInit() {
    // Selects random city out of array
    this.selectedCity = this.cityService.getCities()
    [Math.floor(Math.random() * this.cityService.getCities().length)];
  }

  canAddCity(): boolean {
    if (this.cityService.arrayIsMaxSize(
      this.cityService.getCities(),
       this.cityService.maxSize)) {
        return false;
       } else {
      return true;
    }
  }

  onSelect(city: City): void {
    this.selectedCity = city;
  }

  deleteCity(cityId: number): void {
    this.cityService.deleteCity(cityId);
    // Reroute to cities
    this.router.navigate( ['../cities'] );
  }

}
