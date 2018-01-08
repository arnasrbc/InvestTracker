import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  alerts: Observable<any[]>;
  constructor(public afd: AngularFireDatabase, db: AngularFirestore) {
    this.alerts = db.collection('alerts').valueChanges();
  }

  getAlerts() {
    return this.alerts;
  }


}
