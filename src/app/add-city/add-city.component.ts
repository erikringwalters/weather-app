import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { CityService } from '../city.service'
import { CurrentWeather } from '../CurrentWeather';
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
  getCurrentTemp(): void{
    this.cityService.getCurrentWeather(this.city)
      .subscribe(currentWeather => this.handleGetCurrentTemp(currentWeather));
    }

    handleGetCurrentTemp(currentWeather: CurrentWeather): void {
      this.currentWeather = currentWeather;
    }


}
