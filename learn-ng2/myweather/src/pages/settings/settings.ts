// import { WeatherPage } from './../weather/weather';
import { WeatherService } from './../../app/services/weather.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  results: any;
  searchStr: string;
  defaultLocation: any;

  constructor(public navCtrl: NavController, private _weatherService: WeatherService) {

  }

  ngOnInit() {
    this.getDefaultLocation();
  }

  getQuery() {
    this._weatherService.searchLocations(this.searchStr)
      .subscribe(res => {
        this.results = res.RESULTS;
      });
  }

  getDefaultLocation() {
    if (localStorage.getItem('location') !== undefined) {
      this.defaultLocation = JSON.parse(localStorage.getItem('location')).name;
    } else {
      this.defaultLocation = '10001.11.99999';
    }
  }

  setDefaultLocation(location) {
    this.results = [];
    localStorage.setItem('location', JSON.stringify(location));
    this.searchStr = location.name;
    this.getDefaultLocation();
  }

  saveChanges() {
    // this.navCtrl.push(WeatherPage);
    this.navCtrl.parent.select(0);
  }

}
