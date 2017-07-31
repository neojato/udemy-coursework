import { element } from 'protractor';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';

import { Business } from './../Business';
import { Category } from './../Category';

@Injectable()

export class FirebaseService {
  businesses: FirebaseListObservable<Business[]>;
  categories: FirebaseListObservable<Category[]>;

  constructor(private _db: AngularFireDatabase) {

  }

  getBusinesses(category: string = null) {
    if (category != null) {
      this.businesses = this._db.list('/businesses', {
        query: {
          orderByChild: 'category',
          equalTo: category
        }
      });
    } else {
      this.businesses = this._db.list('/businesses');
    }
    return this.businesses;
  }

  getCategories() {
    this.categories = this._db.list('/categories');
    return this.categories;
  }

  addBusiness(newBusiness) {
    return this.businesses.push(newBusiness);
  }

  updateBusiness(key, updBusiness) {
    return this.businesses.update(key, updBusiness);
  }

  deleteBusiness(key) {
    return this.businesses.remove(key);
  }
}

