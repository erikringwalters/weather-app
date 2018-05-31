import { Injectable } from '@angular/core';
import { City } from './city';
import { CITIES } from './mock-cities';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { url } from 'inspector';
import { Weather, CurrentWeather } from './CurrentWeather';
import * as _ from 'underscore';


@Injectable({
  providedIn: 'root'
})

export class CityService {

  private apiKey = "c4aa1cb6439e378d30ebbd21c64217c6";
  city: City;
  weatherUrl: string;

  constructor(
    private http: HttpClient,
  ) { }

  getCity(): City {
    return this.city;
  }

  getCityByName(name: string): City {
    let matchedCity: City = _.filter(CITIES, function(city: City) {return city.name.toLowerCase().includes(name.toLowerCase())});
    if(matchedCity) {return matchedCity[0];}
    return null;
  }

  getCities(): Observable<City[]> {
     return of (CITIES);
  }

  getApiKey(): string {
    return this.apiKey;
  }

  getUrlByCity(selectedCity: City): string {
    this.apiKey = this.getApiKey();
    this.weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q="
    + selectedCity.name.substr(0, selectedCity.name.indexOf(','))
    + ",us&appid="
    + this.apiKey
    + "&units=Imperial";
    return this.weatherUrl;
  }

  getCurrentWeather(selectedCity: City): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(this.getUrlByCity(selectedCity))
  }

}
