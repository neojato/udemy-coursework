import { WeatherService } from './../../app/services/weather.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage {
  zmw: any;
  weather: any;
  searchStr: string;
  results: any;

  constructor(public navCtrl: NavController, private _weatherService: WeatherService) {

  }

  ngOnInit() {
    this.getDefaultLocation();
    this._weatherService.getWeather(this.zmw)
      .subscribe(weather => {
        this.weather = weather.current_observation;
      });
  }

  ionViewWillEnter() {
    this.getDefaultLocation();
    this._weatherService.getWeather(this.zmw)
      .subscribe(weather => {
        this.weather = weather.current_observation;
      });
  }

  getDefaultLocation() {
    if (localStorage.getItem('location') !== undefined) {
      this.zmw = JSON.parse(localStorage.getItem('location')).zmw;
    } else {
      this.zmw = '10001.11.99999';
    }
  }

  getQuery() {
    this._weatherService.searchLocations(this.searchStr)
      .subscribe(res => {
        this.results = res.RESULTS;
      });
  }

  chooseLocation(location) {
    this.results = [];
    this.searchStr = '';
    this._weatherService.getWeather(location.zmw)
      .subscribe(weather => {
        this.weather = weather.current_observation;
      });
  }
}
