import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {FirebaseProvider} from "../firebase/firebase";
import "rxjs/add/observable/of";

/*
  Generated class for the FilterTypesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilterTypesProvider {

  constructor(private _firestore: FirebaseProvider) {}

  fetchAlertTypes(): Observable<string[]> {
    return this._firestore.alertType$().map(type => type.val);
  }

  fetchEntityTypes(): Observable<string[]> {
    return this._firestore.entityType$().map(type => type.val);
  }

}
