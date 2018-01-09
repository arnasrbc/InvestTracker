import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {FilterTypesProvider} from "../../providers/filter-types/filter-types";
import 'rxjs/add/observable/forkJoin';
import {Observable} from "rxjs/Rx";

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
export class TimelineFilterModalComponent implements OnInit{

  filterModel: any = {};
  toApplyFilterArray: string[];
  entityTypes: string[];
  alertTypes: string[];

  constructor(private _viewCtrl: ViewController, _params: NavParams, private _filterTypesProvider: FilterTypesProvider) {
    this.toApplyFilterArray = _params.get('filter') || [];
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
    this.toApplyFilterArray = Object.keys(this.filterModel)
      .filter(key => this.filterModel[key]);
    this._viewCtrl.dismiss({filter: this.toApplyFilterArray });
  }

  cancel() {
    this._viewCtrl.dismiss({filter: this.toApplyFilterArray });
  }

  private buildFromPreviousFilter(filter: string[]) {
    let arr: string[] = [].concat(this.entityTypes, this.alertTypes);
    arr.forEach( val => this.filterModel[val] = filter.indexOf(val) > -1);
  }
}
