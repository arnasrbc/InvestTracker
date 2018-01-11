import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {FilterTypesProvider} from "../../providers/filter-types/filter-types";
import 'rxjs/add/observable/forkJoin';
import {arrayAsCodes, DisplayItem} from "../../models/display-item";

/**
 * Generated class for the TimelineFilterModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'entities-filter-modal',
  templateUrl: 'entities-filter-modal.html'
})
export class EntitiesFilterModalComponent implements OnInit {

  filterModel: any = {};
  entitiesFilterArray:  string[];
  entityTypes: DisplayItem[];

  constructor(private _viewCtrl: ViewController, private _params: NavParams, private _filterTypesProvider: FilterTypesProvider) {}

  ngOnInit() {
    this._filterTypesProvider.fetchEntityTypes()
      .subscribe(
        (entities: DisplayItem[]) => {
          this.entityTypes = entities;
          this.entitiesFilterArray =
            this._params.get('filter') || this.initialAllFilter();
          this.buildFromPreviousFilter(this.entitiesFilterArray)
        }
      );
  }

  private initialAllFilter() {
    return arrayAsCodes(this.entityTypes);
  }

  confirm() {
    this.entitiesFilterArray =
      Object.keys(this.filterModel).filter(key => this.filterModel[key]);
    this._viewCtrl.dismiss({filter: this.entitiesFilterArray});
  }

  cancel() {
    this._viewCtrl.dismiss({filter: this.entitiesFilterArray});
  }

  private buildFromPreviousFilter(filter: string[]) {
    this.entityTypes.forEach(v => this.filterModel[v.code] = filter.indexOf(v.code) > -1);
  }
}
