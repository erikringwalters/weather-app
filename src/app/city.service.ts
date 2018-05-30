import { Injectable } from '@angular/core';
import { City } from './city';
import { CITIES } from './mock-cities';
import { Observable, of } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http'
import { url } from 'inspector';


@Injectable({
  providedIn: 'root'
})

export class CityService {

  private apiKey = "c4aa1cb6439e378d30ebbd21c64217c6";
  city: City;
  url: string;

  constructor(
    // private http: HttpClient,
  ) { }

  getCity(): City {
    return this.city;
  }

  getCities(): Observable<City[]> {
     return of (CITIES);
  }

  getApiKey(): string {
    return this.apiKey;
  }

  getUrlByCity(selectedCity: City): string {
  this.apiKey = this.getApiKey();
  this.url = "http://api.openweathermap.org/data/2.5/weather?q="
  + selectedCity.name.substr(0, selectedCity.name.indexOf(','))
  + ",us&appid="
  + this.apiKey;
  return this.url;
  }
}
