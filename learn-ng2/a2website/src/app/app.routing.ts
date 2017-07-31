import { ModuleWithProviders, Component } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AboutComponent } from './components/pages/about.component';
import { HomeComponent } from './components/pages/home.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
