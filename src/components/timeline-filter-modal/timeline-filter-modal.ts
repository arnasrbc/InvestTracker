import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {FilterTypesProvider} from "../../providers/filter-types/filter-types";
import 'rxjs/add/observable/forkJoin';
import {Observable} from "rxjs/Rx";
import {TimelineFilter} from "../../models/timeline-filter";

/**
 * Generated class for the TimelineFilterModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'timeline-filter-modal',
  templateUrl: 'timeline-filter-modal.html'
})
export class TimelineFilterModalComponent implements OnInit {

  filterModel: any = { entity: {}, alert: {} };
  toApplyFilterArray: { entityCategories: string[], eventCategories: string[] };
  entityTypes: string[];
  alertTypes: string[];

  constructor(private _viewCtrl: ViewController, _params: NavParams, private _filterTypesProvider: FilterTypesProvider) {
    this.toApplyFilterArray = _params.get('filter') || { entityCategories: [], eventCategories: [] };
  }

  ngOnInit() {
    Observable.forkJoin(
        this._filterTypesProvider.fetchAlertTypes(),
        this._filterTypesProvider.fetchEntityTypes()
      )
      .subscribe(
        res => {
          this.alertTypes = res[0];
          this.entityTypes = res[1];
          this.buildFromPreviousFilter(this.toApplyFilterArray)
        }
      );
  }

  confirm() {
    this.toApplyFilterArray = {
     entityCategories: Object.keys(this.filterModel.entity).filter(key => this.filterModel.entity[key]),
      eventCategories: Object.keys(this.filterModel.alert).filter(key => this.filterModel.alert[key])
    };
    this._viewCtrl.dismiss({filter: this.toApplyFilterArray });
  }

  cancel() {
    this._viewCtrl.dismiss({filter: this.toApplyFilterArray });
  }

  private buildFromPreviousFilter(filter: { entityCategories: string[], eventCategories: string[] }) {
    this.entityTypes.forEach( v => this.filterModel.entity[v] = filter.entityCategories.indexOf(v) > -1);
    this.alertTypes.forEach( v => this.filterModel.alert[v] = filter.eventCategories.indexOf(v) > -1);
  }
}
