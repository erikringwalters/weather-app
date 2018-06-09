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
  maxSize: number;
  lastUsedCity: City;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
    this.maxSize = 100;
  }

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
    else if(this.getCitiesCookie()){
      this.cities = this.getCitiesCookie();
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
      + selectedCity
      + ",us&appid="
      + this.apiKey
      + "&units=Imperial";
    return this.weatherUrl;
  }

  getUrlByCityName(cityName: string): string {
    this.apiKey = this.getApiKey();
    this.weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q="
      + cityName
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

  saveCitiesCookie(): void {
    let cityList = JSON.stringify(this.getCities());
    this.cookieService.set("cityList", cityList, 365);
  }

  saveLastUsedCityCookie(): void {
    let lastUsedCity = JSON.stringify(this.lastUsedCity);
    this.cookieService.set("lastUsedCity", lastUsedCity, 365)
  }

  getCitiesCookie(): City[] {
    if(this.cookieService.check("cityList")) {
      return JSON.parse(this.cookieService.get("cityList"));
    }
  }

  getLastUsedCityCookie(): City {
    if(this.cookieService.check("lastUsedCity")) {
      return JSON.parse(this.cookieService.get("lastUsedCity"));
    }
  }

  buildCity(name: string, id: number, weatherId: number, icon: string): City {
    let city = new City;
    city.name = name;
    city.id = id;
    city.weatherId = weatherId;
    city.icon = icon;
    return city;
  }

  addCity(name: string, id: number, weatherId: number, icon: string) {
    //duplicate found
    if(this.cityExists(id)){
      return;
    }
    this.getCities().push(this.buildCity(name, id, weatherId, icon));
    this.saveCitiesCookie();
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
    this.saveCitiesCookie();
  }

  arrayIsMaxSize(array: any[], maxSize): boolean {
    if(array.length >= maxSize)
    {
      return true;
    }
    else {return false;}
  }

  setLastUsedCity(city: City): void {
    this.lastUsedCity = city;
  }

}
