import { Lesson } from './../shared/model/Lesson';
import { LessonsService } from './../shared/model/lessons.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allLessons: Lesson[];
  filtered: Lesson[];

  constructor(private _lessonsService: LessonsService) { }

  ngOnInit() {
    this._lessonsService.findAllLessons()
      .do(console.log)
      .subscribe(
        lessons => this.allLessons = this.filtered = lessons
      );
  }

  search(search: string) {
    this.filtered = this.allLessons.filter(lesson => lesson.description.includes(search));
  }

}
