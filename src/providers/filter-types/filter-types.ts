import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {EVENT_CATEGORIES} from "../../models/event-category";

/*
  Generated class for the FilterTypesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilterTypesProvider {

  constructor() {}

  fetchAlertTypes(): Observable<string[]> {
    return Observable.of(EVENT_CATEGORIES.map( c => c.code ));
  }

  fetchEntityTypes(): Observable<string[]> {
    return Observable.of(['share_class', 'account', 'legal_fund', 'investor', 'dealer', 'holding', 'trade']);
  }

}
