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
    this.alertCollectionRef = db.collection('alerts');
  }

  alert$() {
    let firstLoad = true;
    return this.alertCollectionRef.valueChanges()
      .flatMap(arr => {
        console.log('arr', arr);
        let o =Observable.combineLatest(Observable.of(firstLoad), Observable.from(arr));
        firstLoad = false;
        return Observable.from(arr);
      })
      .do( a => console.log('d', a))
      .map( (firebaseAlert) => {
        return {
          id: firebaseAlert.id,
          entityName: firebaseAlert.entity_name,
          entityCategory: firebaseAlert.entity_category,
          entityId: firebaseAlert.entity_id,
          eventCategory: firebaseAlert.event_category,
          message: firebaseAlert.message,
          timestamp: firebaseAlert.timestamp,
          //firstLoad: loadStatus
        }
      });
  }
}
