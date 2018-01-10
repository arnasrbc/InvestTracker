import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalController} from "ionic-angular";
import {TimelineFilterModalComponent} from "../timeline-filter-modal/timeline-filter-modal";

@Component({
  selector: 'timeline-filter',
  templateUrl: 'timeline-filter.html'
})
export class TimelineFilterComponent {

  searchInput: string;
  internalFilter: any;
  @Output()
  filterChange: EventEmitter<any>;

  constructor(private _modalCtrl: ModalController) {
    this.filterChange = new EventEmitter();
  }

  presentFilterModal() {
    let filterModal = this._modalCtrl.create(TimelineFilterModalComponent, { filter: this.internalFilter});
    filterModal.onDidDismiss( (data: { filter: any }) => {
      this.internalFilter = data.filter;
      this.filterChange.emit(this.internalFilter);
    });
    filterModal.present();
  }


}
