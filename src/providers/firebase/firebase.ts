import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { IAlert } from '../../model/IAlert';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  alertCollectionRef: AngularFirestoreCollection<IAlert>;
  alerts: Observable<IAlert[]>;

  constructor(public db: AngularFirestore) {
    this.alertCollectionRef = db.collection<IAlert>('alerts');
    this.alerts = this.alertCollectionRef.valueChanges();

  }

  getAlerts() {
    return this.alerts;
  }


}
