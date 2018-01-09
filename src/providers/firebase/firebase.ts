import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';
import { IAlert } from '../../models/alert.interface';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
type Type = {val: string[] }

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

  alertsByEntityId$(entityId: string) {
    return this.alertObservable
      .filter(alert => alert.entityId === entityId)
      .map(alert => alert);
  }

  alertType$(): Observable<Type> {
    return this.db
               .collection<any>('types')
               .doc<Type>('alerts')
               .valueChanges()
               .take(1);
  }

  entityType$(): Observable<Type> {
    return this.db
               .collection<any>('types')
               .doc<Type>('entities')
               .valueChanges()
               .take(1)

  }

}
