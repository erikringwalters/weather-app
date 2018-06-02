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
  currentWeather: CurrentWeather;
  cities = CITIES;


  constructor(
    private cityService: CityService,

  ) { }

  ngOnInit() {
    this.city = CITIES[0];
  }

  //make a server call to see if city is valid
  prepareToAddCity(cityName: string): void {
    this.cityService.getCurrentWeatherByName(cityName)
      .subscribe(currentWeather => this.validateCity(currentWeather));
  }

  validateCity(weather: CurrentWeather): void {
    if(weather)
    {
      this.addCityToListByWeather(weather);
    }
  }

  addCityToListByWeather(weather: CurrentWeather): void {
    this.cityService.cities.push(this.buildCity(weather.name, weather.id));
  }

  buildCity(name: string, id: number): City {
    let city = new City;
    city.name = name;
    city.id = id;
    return city;
  }

    handleGetCurrentTemp(currentWeather: CurrentWeather): void {
      this.currentWeather = currentWeather;
  }


}
