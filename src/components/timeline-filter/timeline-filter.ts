import {Component, EventEmitter, Output} from '@angular/core';
import {ModalController} from "ionic-angular";
import {TimelineFilterModalComponent} from "../timeline-filter-modal/timeline-filter-modal";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'timeline-filter',
  templateUrl: 'timeline-filter.html'
})
export class TimelineFilterComponent {

  searchInput: string;
  internalFilter: any;
  @Output()
  filterChange: EventEmitter<any>;

  searchUpdate$:Subject<string> = new Subject();

  constructor(private _modalCtrl: ModalController) {
    this.filterChange = new EventEmitter();
    this.listenForInputChange();
  }

  presentFilterModal() {
    let filterModal = this._modalCtrl.create(TimelineFilterModalComponent, { filter: this.internalFilter});
    filterModal.onDidDismiss( (data: { filter: any }) => {
      this.internalFilter = data.filter;
      this.emitNewFilter();
    });
    filterModal.present();
  }

  private emitNewFilter() {
    this.filterChange.emit(Object.assign({}, this.internalFilter, {searchInput: this.searchInput}));
  }

  searchInputChanged($event) {
    this.searchUpdate$.next($event.target.value);
  }

  private listenForInputChange() {
    this.searchUpdate$.asObservable()
      .throttleTime(1000)
      .subscribe( val => {
        console.log("val", val);
        this.searchInput = val;
        this.emitNewFilter();
      })
  }
}
