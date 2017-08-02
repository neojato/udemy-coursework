import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class MovieService {
  apiKey: string;

  constructor(private _jsonp: Jsonp) {
    this.apiKey = 'API_KEY';
  }

  getPopular() {
    return this._jsonp.get('https://api.themoviedb.org/3/discover/movie?api_key=' + this.apiKey + '&callback=JSONP_CALLBACK'
      + '&sort_by=popularity.desc')
      .map(res => res.json());
  }

  getInTheaters() {
    const today = new Date();
    const past = new Date();
    past.setDate(past.getDate() - 14);

    const pastDate = past.getFullYear() + '-' + past.getMonth() + '-' + past.getDate();
    const todayDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();

    return this._jsonp.get('https://api.themoviedb.org/3/discover/movie?api_key=' + this.apiKey + '&callback=JSONP_CALLBACK'
      + '&primary_release_date.gte=' + pastDate + '&primary_release_date.lte=' + todayDate)
      .map(res => res.json());
  }

  searchMovies(searchStr: string) {
    return this._jsonp.get('https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey + '&callback=JSONP_CALLBACK'
      + '&query=' + searchStr + '&sort_by=popularity.desc')
      .map(res => res.json());
  }

  getMovie(id: string) {
    return this._jsonp.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + this.apiKey + '&callback=JSONP_CALLBACK')
      .map(res => res.json());
  }

}
