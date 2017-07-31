import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class WeatherService {
  apiKey: string;
  conditionsUrl: string;
  searchUrl: string;

  constructor(private _http: Http) {
    this.apiKey = '6d2815d6708948eb';
    this.conditionsUrl = 'http://api.wunderground.com/api/' + this.apiKey + '/conditions/q';
    this.searchUrl = 'http://localhost:8101/search/aq?query=';
  }

  getWeather(zmw) {
    return this._http.get(this.conditionsUrl + '/zmw:' + zmw + '.json')
      .map(res => res.json());
  }

  searchLocations(searchStr) {
    return this._http.get(this.searchUrl + searchStr)
      .map(res => res.json());
  }
}
