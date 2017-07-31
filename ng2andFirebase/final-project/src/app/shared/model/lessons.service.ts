import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Lesson } from './Lesson';
import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { FirebaseApp } from 'angularfire2';
import { firebaseConfig } from '../../../environments/firebase.config';

@Injectable()
export class LessonsService {
  sdkDb: any;

  constructor(private _db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp, private _http: Http) {
    this.sdkDb = fb.database().ref();
  }

  findAllLessons(): Observable<Lesson[]> {
    return this._db.list('lessons')
      .do(console.log)
      .map(Lesson.fromJsonArray);
  }

  findLessonByUrl(url: string): Observable<Lesson> {
    return this._db.list('lessons', {
      query: {
        orderByChild: 'url',
        equalTo: url
      }
    })
      .map(results => Lesson.fromJson(results[0]));
  }

  loadNextLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this._db.list(`lessonsPerCourse/${courseId}`, {
      query: {
        orderByKey: true,
        startAt: lessonId,
        limitToFirst: 2
      }
    })
      .map(results => results[1].$key)
      .switchMap(lessonId => this._db.object(`lessons/${lessonId}`))
      .map(Lesson.fromJson);
  }

  loadPreviousLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this._db.list(`lessonsPerCourse/${courseId}`, {
      query: {
        orderByKey: true,
        endAt: lessonId,
        limitToFirst: 2
      }
    })
      .map(results => results[0].$key)
      .switchMap(lessonId => this._db.object(`lessons/${lessonId}`))
      .map(Lesson.fromJson);
  }

  createNewLesson(courseId: string, lesson: any): Observable<any> {
    const lessonsToSave = Object.assign({}, lesson, { courseId });

    const newLessonKey = this.sdkDb.child('lessons').push().key;

    const dataToSave = {};
    dataToSave['lessons/' + newLessonKey] = lessonsToSave;
    dataToSave['lessonsPerCourse/' + courseId + '/' + newLessonKey] = true;

    return this.firebaseUpdate(dataToSave);
  }

  firebaseUpdate(dataToSave) {
    const subject = new Subject();

    this.sdkDb.update(dataToSave)
      .then(val => {
        subject.next(val);
        subject.complete();
      }, err => {
        subject.error(err);
        subject.complete();
      });

    return subject.asObservable();
  }

  saveLesson(lessonId: string, lesson): Observable<any> {
    const lessonToSave = Object.assign({}, lesson);
    delete (lessonToSave.$key);

    const dataToSave = {};
    dataToSave['lessons/' + lessonId] = lessonToSave;

    return this.firebaseUpdate(dataToSave);
  }

  deleteLesson(lessonId: string): Observable<any> {
    const url = firebaseConfig.databaseURL + '/lessons/' + lessonId + '.json';
    return this._http.delete(url);
  }

  requestLessonDeletion(lessonId: string, courseId: string) {
    this.sdkDb.child('queue/tasks').push({ lessonId, courseId })
      .then(
        () => alert('lesson deletion requested!')
      );
  }

}
