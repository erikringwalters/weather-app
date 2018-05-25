import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { CITIES } from '../mock-cities'
@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.css']
})
export class ListCitiesComponent implements OnInit {

  city: City = {
    id: 1,
    name: 'Monterey, California'
  };

  cities = CITIES;

  constructor() { }


  ngOnInit() {

  }

}
