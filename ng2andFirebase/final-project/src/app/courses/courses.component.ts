import { Course } from './../shared/model/Course';
import { CoursesService } from './../shared/model/courses.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor(private _coursesService: CoursesService) { }

  ngOnInit() {
    this.courses$ = this._coursesService.findAllCourses();
  }

}
