import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {FilterTypesProvider} from "../../providers/filter-types/filter-types";
import 'rxjs/add/observable/forkJoin';
import {Observable} from "rxjs/Rx";
import {TimelineFilter} from "../../models/timeline-filter";
import {arrayAsCodes, DisplayItem} from "../../models/display-item";

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
  entityTypes: DisplayItem[];
  alertTypes: DisplayItem[];

  constructor(private _viewCtrl: ViewController, private _params: NavParams, private _filterTypesProvider: FilterTypesProvider) {}

  ngOnInit() {
    Observable.forkJoin(
        this._filterTypesProvider.fetchAlertTypes(),
        this._filterTypesProvider.fetchEntityTypes()
      )
      .subscribe(
        res => {
          this.alertTypes = res[0];
          this.entityTypes = res[1];
          this.toApplyFilterArray =
            this._params.get('filter') || this.initialAllFilter();
          this.buildFromPreviousFilter(this.toApplyFilterArray)
        }
      );
  }

  private initialAllFilter() {
    return {
      entityCategories: arrayAsCodes(this.entityTypes),
      eventCategories: arrayAsCodes(this.alertTypes)
    };
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
    this.entityTypes.forEach( v => this.filterModel.entity[v.code] = filter.entityCategories.indexOf(v.code) > -1);
    this.alertTypes.forEach( v => this.filterModel.alert[v.code] = filter.eventCategories.indexOf(v.code) > -1);
  }
}
