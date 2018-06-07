import { Injectable } from '@angular/core';
import { City } from './city';
import { CITIES } from './mock-cities';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Weather, CurrentWeather } from './CurrentWeather';
import * as _ from 'underscore';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class CityService {

  private apiKey = "c4aa1cb6439e378d30ebbd21c64217c6";
  city: City;
  weatherUrl: string;
  cities: City[];

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  getCity(): City {
    return this.city;
  }

  getCityByName(name: string): City {
    let matchedCity: City = _.filter(CITIES, function(city: City) {return city.name.toLowerCase().includes(name.toLowerCase())});
    if(matchedCity) {//Return only one city rather than array of cities
      return matchedCity[0];
    }
    return null;
  }

  getCityById(id: number): City {
    let matchedCity: City = _.filter(this.getCities(), function(city: City) {return city.id == id});
    if(matchedCity) {//Return only one city rather than array of cities
      return matchedCity[0];
    }
    return null;
  }

  getCities(): City[] {
    if(this.cities)
    {
      return this.cities;
    }
    else if(this.getCookie()){
      this.cities = this.getCookie();
      return this.cities;
    }
    else {
      this.cities = CITIES;
      return this.cities;
    }
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

  getUrlByCityName(cityName: string): string {
    this.apiKey = this.getApiKey();
    this.weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q="
    //Changed comma delimitation
      + cityName//.substr(0, cityName.indexOf(','))
      + ",us&appid="
      + this.apiKey
      + "&units=Imperial";
    return this.weatherUrl;
  }

  getUrlByCityId(cityId: number): string {
    this.apiKey = this.getApiKey();
    this.weatherUrl = "http://api.openweathermap.org/data/2.5/weather"
      + "?id="
      + cityId
      + "&appid="
      + this.apiKey
      + "&units=Imperial";
    return this.weatherUrl;
  }

  getCurrentWeather(selectedCity: City): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(this.getUrlByCity(selectedCity))
  }

  getCurrentWeatherByName(cityName: string): Observable<CurrentWeather> {
    return this.http
      .get<CurrentWeather>(this.getUrlByCityName(cityName))
      .pipe(
        catchError(this.handleError('getCurrentWeatherByName', null))
      );
  }

  getCurrentWeatherById(cityId: number): Observable<CurrentWeather> {
    return this.http
      .get<CurrentWeather>(this.getUrlByCityId(cityId))
      .pipe(
        catchError(this.handleError('getCurrentWeatherById', null))
      );
  }

  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

  saveCookie(): void {
    let cityList = JSON.stringify(this.getCities());
    this.cookieService.set("cityList", cityList);
  }

  getCookie(): City[] {
    if(this.cookieService.check("cityList")) {
      return JSON.parse(this.cookieService.get("cityList"));
    }
  }

  buildCity(name: string, id: number): City {
    let city = new City;
    city.name = name;
    city.id = id;
    return city;
  }

  addCity(name: string, id: number) {
    if(this.cityExists(id))
    {return;}
    this.getCities().push(this.buildCity(name, id));
    this.saveCookie();
  }

  cityExists(id: number): boolean {
    if(_.filter(this.getCities(), function(cityFromCities: City) { return cityFromCities.id == id }).length > 0) {
      return true;
    }
    else {
    return false;
    }
  }

  deleteCity(cityId: number): void {
    this.cities = _.filter(this.getCities(), function(cityFromCities: City) { return cityFromCities.id != cityId });
    this.saveCookie();
  }

  getCookieData(): City[] {
    return this.getCookie();
  }

}
