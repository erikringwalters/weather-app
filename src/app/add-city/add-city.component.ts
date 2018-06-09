import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { CityService } from '../city.service'
import { CurrentWeather, Weather } from '../CurrentWeather';
import { CITIES } from '../mock-cities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})


export class AddCityComponent implements OnInit {

  city: City;
  cityName: string;
  currentWeather: CurrentWeather;

  errorMessage: string;


  constructor(
    private cityService: CityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.city = null;
    this.errorMessage = "";
    ;
  }

  //make a server call to see if city is valid
  prepareToAddCity(cityName: string): void {
    this.errorMessage = "";
    //if too many cities
    if(this.cityService.arrayIsMaxSize(
      this.cityService.getCities(),
       this.cityService.maxSize)) {
        this.errorMessage = "Cannot add city: too many cities";
       }
    else if(cityName) {
    this.cityService.getCurrentWeatherByName(cityName)
      .subscribe(currentWeather => this.validateCity(currentWeather));
    }
    else {
      this.errorMessage = "Must enter a city name";
    }
  }

  validateCity(weather: CurrentWeather): void {
    if(weather) {
      this.addCityToListByWeather(weather);
    }
    else {
      this.errorMessage = "No city found by that name";
    }
  }

  addCityToListByWeather(weather: CurrentWeather): void {
    let city = this.cityService.buildCity(weather.name, weather.id, weather.weather[0].id, weather.weather[0].icon, weather.weather[0].description)
    this.cityService.addCity(city.name, city.id, city.weatherId, city.icon, city.description);
    this.routeToAddedCity(city);
  }

    handleGetCurrentTemp(currentWeather: CurrentWeather): void {
      this.currentWeather = currentWeather;
  }

  routeToAddedCity(city: City) {
    this.router.navigate( ['../city/', city.id] )
  }


}
