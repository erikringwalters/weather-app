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

  currentWeather: CurrentWeather;
  currentWeatherTemp: number;



  constructor(
    private cityService: CityService,
    private route: ActivatedRoute ) {
      this.currentWeather = new CurrentWeather();
   }

  ngOnInit() {
    let name = this.route.snapshot.paramMap.get('name');

    this.city = this.cityService.getCityByName(name);
    this.getCurrentTemp();
  }

  getCurrentCity(): void {
    this.city = this.cityService.getCity();
  }

  getCurrentTemp(): void{
  this.cityService.getCurrentWeather(this.city)
    .subscribe(currentWeather => this.handleGetCurrentTemp(currentWeather));
  }

  handleGetCurrentTemp(currentWeather: CurrentWeather): void {
    this.currentWeather = currentWeather;
    this.currentWeatherTemp = currentWeather.main.temp;
  }

}
