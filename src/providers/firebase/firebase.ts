import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Rx';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class FirebaseProvider {

  alertCollectionRef: AngularFirestoreCollection<any>;

  constructor(public db: AngularFirestore) {
    this.alertCollectionRef = db.collection('alerts', ref => ref.orderBy('timestamp', 'desc'));
  }

  alert$() {
    return this.alertCollectionRef.valueChanges()
      .flatMap(arr => Observable.from(arr))
      .map( (firebaseAlert:any) => {
        return {
          id: firebaseAlert.id,
          entityName: firebaseAlert.entity_name,
          entityCategory: firebaseAlert.entity_category,
          entityId: firebaseAlert.entity_id,
          eventCategory: firebaseAlert.event_category,
          message: firebaseAlert.message,
          timestamp: firebaseAlert.timestamp
        }
      });
  }
}
