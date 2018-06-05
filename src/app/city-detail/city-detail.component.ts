import { Component, OnInit, Input } from '@angular/core';
import { City } from '../city';
import { CityService } from '../city.service'
import { CurrentWeather } from '../CurrentWeather';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {

  city: City;
  cities: City[];

  currentWeather: CurrentWeather;
  currentWeatherTemp: number;

  constructor(
    private cityService: CityService,
    private route: ActivatedRoute ) {
      this.currentWeather = new CurrentWeather();
   }

  ngOnInit() {
    this.cities = this.cityService.getCities();
    let name = this.route.snapshot.paramMap.get('name');
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.city = this.cityService.getCityById(id);
    this.getCurrentTemp();
  }

  getCurrentCity(): void {
    this.city = this.cityService.getCity();
  }

  getCurrentTemp(): void{
  this.cityService.getCurrentWeatherById(this.city.id)
    .subscribe(currentWeather => this.handleGetCurrentTemp(currentWeather));
  }

  handleGetCurrentTemp(currentWeather: CurrentWeather): void {
    this.currentWeather = currentWeather;
    this.currentWeatherTemp = currentWeather.main.temp;
  }

}
