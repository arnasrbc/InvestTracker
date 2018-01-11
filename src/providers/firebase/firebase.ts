import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Rx';
import * as firebase from "firebase";
import DocumentChangeType = firebase.firestore.DocumentChangeType;

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class FirebaseProvider {

  alertCollectionRef: AngularFirestoreCollection<any>;

  constructor(public db: AngularFirestore) {
    this.alertCollectionRef = db.collection('alerts')
  }

  alert$() {
    let firstLoad = true;
    return this.alertCollectionRef.stateChanges(['added'])
      .flatMap(arr => {
        let o = Observable.combineLatest(Observable.of(firstLoad), Observable.from(arr));
        firstLoad = false;
        return o;
      })
      .map( ([load, firebaseAlert]: [boolean, DocumentChangeAction]) => {
        return [load, firebaseAlert.payload.doc.data()]
      })
      .map( ([load, firebaseAlert]: [boolean, any]) => {
        return {
          id: firebaseAlert.id,
          entityName: firebaseAlert.entity_name,
          entityCategory: firebaseAlert.entity_category,
          entityId: firebaseAlert.entity_id,
          eventCategory: firebaseAlert.event_category,
          message: firebaseAlert.message,
          timestamp: firebaseAlert.timestamp,
          firstLoad: load
        }
      });
  }
}
