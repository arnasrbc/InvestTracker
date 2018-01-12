import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {isUndefined} from "util";

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class FirebaseProvider {

  constructor(public db: AngularFirestore) {

  }

  getCollection (path, orderField, direction, limit, start?) : AngularFirestoreCollection<any> {
    return isUndefined(start) ? this.db.collection(path, ref => ref.orderBy(orderField, direction).limit(limit).where('timestamp', '<=', new Date())) :
      this.db.collection(path, ref => ref.orderBy(orderField, direction).limit(limit).startAfter(start).where('timestamp', '<=', new Date()));
  }

  collectionAfterGivenTime(path, time: Date) {
    return this.db.collection(path,  ref => ref.orderBy('timestamp', 'asc')
                                                               .where('timestamp', '>', time));
  }

}
