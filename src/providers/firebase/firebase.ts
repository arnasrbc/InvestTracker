import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {isUndefined} from "util";
import {TimelineFilter} from "../../models/timeline-filter";
import * as firebase from "firebase";

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class FirebaseProvider {

  alertCollectionRef: AngularFirestoreCollection<any>;
  readAlertCollectionRef: AngularFirestoreCollection<any>;

  constructor(public db: AngularFirestore) {
    this.alertCollectionRef = db.collection('alerts', ref => ref.orderBy('timestamp', 'asc'));
    this.readAlertCollectionRef = db.collection('read-alerts');
  }

  getCollection (path, orderField, direction, limit, filter: TimelineFilter, start?) : AngularFirestoreCollection<any> {
    console.log("f",filter);
    console.log("start", start);
    return isUndefined(start) ? this.db.collection(path, ref => this.applyFilter(ref.orderBy(orderField, direction).limit(limit).where('timestamp', '<=', new Date()), filter)) :
      this.db.collection(path, ref => this.applyFilter(ref.orderBy(orderField, direction).limit(limit).startAfter(start).where('timestamp', '<=', new Date()), filter));
  }

  collectionAfterGivenTime(path, time: Date, filter?: TimelineFilter):  AngularFirestoreCollection<any> {
    return this.db.collection(path,  ref => this.applyFilter(ref.orderBy('timestamp', 'asc')
                                                               .where('timestamp', '>', time), filter));



  }

  setLastReadAlertId(alertId) {
    this.readAlertCollectionRef.doc("sabonis").set({
      userId: "sabonis",
      id: alertId
    });
  }

  getLastReadAlertId() {
    return this.readAlertCollectionRef.doc("sabonis");
  }

  private applyFilter(query: firebase.firestore.Query, filter?: TimelineFilter) {
    console.log("&", filter)
    let q = query;

    if (filter && filter.searchInput) {
     //q = q.where();
    }

    if (filter && filter.entityId) {
      console.log("entityId", filter.entityId)

      q = q.where('entity_id', '==', filter.entityId);
    }

    if (filter && filter.entityCategories) {
      //q = q.where().;
    }

    if (filter && filter.eventCategories) {
      //q = q.where();
    }
    console.log(filter);

    return q;
  }
}
