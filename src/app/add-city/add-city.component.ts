import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { CityService } from '../city.service'
import { CurrentWeather, Weather } from '../CurrentWeather';
import { CITIES } from '../mock-cities';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})


export class AddCityComponent implements OnInit {

  city: City;
  cityName: string;
  currentWeather: CurrentWeather;
  cities = CITIES;
  errorMessage: string;


  constructor(
    private cityService: CityService,

  ) { }

  ngOnInit() {
    this.city = null;
    this.errorMessage = "";
  }

  //make a server call to see if city is valid
  prepareToAddCity(cityName: string): void {
    this.errorMessage = "";
    if(cityName) {
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
    let city = this.cityService.buildCity(weather.name, weather.id)
    this.cityService.addCity(city.name, city.id);

  }

    handleGetCurrentTemp(currentWeather: CurrentWeather): void {
      this.currentWeather = currentWeather;
  }


}
