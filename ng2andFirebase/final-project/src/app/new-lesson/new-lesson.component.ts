import { LessonsService } from './../shared/model/lessons.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.css']
})
export class NewLessonComponent implements OnInit {
  courseId: string;

  constructor(private _route: ActivatedRoute, private _lessonsService: LessonsService) { }

  ngOnInit() {
    this.courseId = this._route.snapshot.queryParams['courseId'];
  }

  save(form) {
    this._lessonsService.createNewLesson(this.courseId, form.value)
    .subscribe(
      () => {
        alert('lesson created succesfully. Create another lesson?');
        form.reset();
      },
      err => alert(`error creating lesson ${err}`)
    );
  }

}
