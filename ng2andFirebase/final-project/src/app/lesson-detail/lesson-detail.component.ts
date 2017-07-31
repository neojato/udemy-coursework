import { Lesson } from './../shared/model/Lesson';
import { LessonsService } from './../shared/model/lessons.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {
  lesson: Lesson;

  constructor(private _route: ActivatedRoute, private _router: Router, private _lessonsService: LessonsService) { }

  ngOnInit() {
    this._route.params.switchMap(params => {
      const lessonUrl = params['id'];
      return this._lessonsService.findLessonByUrl(lessonUrl);
    }).subscribe(lesson => this.lesson = lesson);
  }

  next() {
    this._lessonsService.loadNextLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }

  previous() {
    this._lessonsService.loadPreviousLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }

  navigateToLesson(lesson: Lesson) {
    this._router.navigate(['lessons', lesson.url]);
  }

  delete() {
    this._lessonsService.deleteLesson(this.lesson.$key)
      .subscribe(
        () => alert('Lesson deleted'),
        console.error
      );
  }

  requestLessonDeletion(lessonId: string, courseId: string) {
    this._lessonsService.requestLessonDeletion(this.lesson.$key, this.lesson.courseId);
  }

}
