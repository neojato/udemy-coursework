import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: Object;

  constructor(private router: ActivatedRoute, private _movieService: MovieService) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      const id = params['id'];
      this._movieService.getMovie(id).subscribe(movie => {
        this.movie = movie;
      });
    });
  }

}
