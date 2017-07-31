import { Lesson } from './../shared/model/Lesson';
import { Course } from './../shared/model/Course';
import { Observable } from 'rxjs/Rx';
import { CoursesService } from './../shared/model/courses.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course$: Observable<Course>;
  lessons: Lesson[];
  courseUrl: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _coursesService: CoursesService
  ) { }

  ngOnInit() {
    const courseUrl = this._route.snapshot.params['id'];

    this.course$ = this._coursesService.findCourseByUrl(courseUrl);

    // this.lessons$ = this._coursesService.findAllLessonsForCourse(courseUrl);
    const lessons$ = this._coursesService.loadFirstLessonsPage(courseUrl, 3);

    lessons$.subscribe(lessons => this.lessons = lessons);
  }

  next() {
    this._coursesService.loadNextPage(
      this.courseUrl,
      this.lessons[this.lessons.length - 1].$key,
      3
    )
    .subscribe(lessons => this.lessons = lessons);
  }

  previous() {
    this._coursesService.loadPreviousPage(
      this.courseUrl,
      this.lessons[0].$key,
      3
    )
    .subscribe(lessons => this.lessons = lessons);
  }

  navigateToLesson(lesson: Lesson) {
    this._router.navigate(['lessons', lesson.url]);
  }

}
