import { LessonsService } from './lessons.service';
import { Observable } from 'rxjs/Rx';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Lesson } from './Lesson';
import { Injectable } from '@angular/core';

@Injectable()
export class LessonResolver implements Resolve<Lesson> {

  constructor(private _lessonsService: LessonsService) {}

  resolve(route: ActivatedRouteSnapshot, state:  RouterStateSnapshot): Observable<Lesson> {
    return this._lessonsService
      .findLessonByUrl(route.params['id'])
      .first();
  }

}
