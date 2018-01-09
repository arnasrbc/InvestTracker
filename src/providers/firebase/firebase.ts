import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';
import { IAlert } from '../../models/alert.interface';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  alertCollectionRef: AngularFirestoreCollection<IAlert>;
  alertObservable: Observable<IAlert>;

  constructor(public db: AngularFirestore) {
    this.alertCollectionRef = db.collection<IAlert>('alerts');
    this.alertObservable =
      this.alertCollectionRef.valueChanges()
        .flatMap(arr => Observable.from(arr));
  }

  alert$() {
    return this.alertObservable;
  }

  alertsByCategory$(category: string) {
    return this.alertObservable
      .filter(alert => alert.entityCategory === "share_class")
      .map(alert => alert);
  }

}
