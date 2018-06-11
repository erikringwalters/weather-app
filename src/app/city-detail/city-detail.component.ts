import { Component, OnInit, Input } from '@angular/core';
import { City } from '../city';
import { CityService } from '../city.service';
import { CurrentWeather } from '../CurrentWeather';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {

  [x: string]: any;
  city: City;
  cities: City[];

  currentWeather: CurrentWeather;
  currentWeatherTemp: number;

  constructor(
    private cityService: CityService,
    private router: Router,
    private route: ActivatedRoute ) {
      this.currentWeather = new CurrentWeather();
   }

  ngOnInit() {
    this.cities = this.cityService.getCities();
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    // Get from cookie if id is undefined
    if (Number.isNaN(id)) {
      const continueProcessing = this.handleNaNId(id);
      if (!continueProcessing) {
        return;
      }
    } else {
      this.city = this.cityService.getCityById(id);
    }

    this.getCurrentTemp();
    this.cityService.setLastUsedCity(this.city);
    this.cityService.saveLastUsedCityCookie();
  }


  handleNaNId(id: number): boolean {
      // last used city is not null and last used city is in cities array
      if (this.cityService.lastUsedCity
        && this.cityService.cityExists(id)) {
        this.city = this.cityService.lastUsedCity;
        return true;
      } else if (this.cityService.getLastUsedCityCookie() // if cookie is not null and cookie value is in cities array
      && this.cityService.cityExists(id)) {
        this.city = this.cityService.getLastUsedCityCookie();
        return true;
      } else { // both lastUsedCity and cookie are null or not in cities list

        this.router.navigate( ['../cities'] );
        return false;
      }

  }

  getCurrentCity(): void {
    this.city = this.cityService.getCity();
  }

  getCurrentTemp(): void {
  this.cityService.getCurrentWeatherById(this.city.id)
    .subscribe(currentWeather => this.handleGetCurrentTemp(currentWeather));
  }

  handleGetCurrentTemp (currentWeather: CurrentWeather): void {
    this.currentWeather = currentWeather;
    this.currentWeatherTemp = currentWeather.main.temp;
  }

  getLastUsedCity(): City {
    if (this.cityService.getLastUsedCityCookie()) {
      return this.cityService.getLastUsedCityCookie();
    }
  }

  getWeatherClass(city: City): string {
    return 'owf owf-' + city.weatherId + ' owf-5x';
  }

}
