import { AuthInfo } from './auth-info';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor(private _afAuth: AngularFireAuth) { }

  login(email, password): Observable<AuthInfo> {
    return this.fromFirebaseAuthPromise(this._afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  signUp(email, password) {
    return this.fromFirebaseAuthPromise(this._afAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  fromFirebaseAuthPromise(promise): Observable<any> {
    const subject = new Subject<any>();
    promise.then(
      res => {
        const authInfo = new AuthInfo(this._afAuth.auth.currentUser.uid);
        this.authInfo$.next(authInfo);
        subject.next(res);
        subject.complete();
      },
      err => {
        this.authInfo$.error(err);
        subject.error(err);
        subject.complete();
      }
    );
    return subject.asObservable();
  }

  logout() {
    this._afAuth.auth.signOut();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
  }

}
