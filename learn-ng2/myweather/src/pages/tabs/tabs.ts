import { SettingsPage } from './../settings/settings';
import { WeatherPage } from './../weather/weather';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WeatherPage;
  tab2Root = SettingsPage;

  constructor() {

  }
}
