import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {EVENT_CATEGORIES} from "../../models/event-category";
import {DisplayItem} from "../../models/display-item";
import {ENTITIES_CATEGORIES} from "../../models/entities-category";

/*
  Generated class for the FilterTypesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilterTypesProvider {

  constructor() {
  }

  fetchAlertTypes(): Observable<DisplayItem[]> {
    return Observable.of(EVENT_CATEGORIES.map(c => {
      return {
       label: c.label,
       code: c.code
    };
    }));
  }

  fetchEntityTypes(): Observable<DisplayItem[]> {
    return Observable.of(ENTITIES_CATEGORIES);
  }

}
