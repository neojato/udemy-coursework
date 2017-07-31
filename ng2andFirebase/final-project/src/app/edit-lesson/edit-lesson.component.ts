import { LessonsService } from './../shared/model/lessons.service';
import { Lesson } from './../shared/model/Lesson';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {
  lesson: Lesson;

  constructor(private _route: ActivatedRoute, private _lessonsService: LessonsService) {
    _route.data
      .do(console.log)
      .subscribe(
        data => this.lesson = data['lesson']
      );
  }

  ngOnInit() {
  }

  save(lesson) {
    this._lessonsService.saveLesson(this.lesson.$key, lesson)
      .subscribe(
        () => {
          alert('lesson saved succesfully.');
        },
        err => alert(`error saving lesson ${err}`)
      );
  }

}
