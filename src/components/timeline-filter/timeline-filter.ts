import { Component } from '@angular/core';
import {ModalController} from "ionic-angular";
import {TimelineFilterModalComponent} from "../timeline-filter-modal/timeline-filter-modal";

@Component({
  selector: 'timeline-filter',
  templateUrl: 'timeline-filter.html'
})
export class TimelineFilterComponent {

  searchInput: string;
  filters: string[];

  constructor(private _modalCtrl: ModalController) {}

  presentFilterModal() {
    let filterModal = this._modalCtrl.create(TimelineFilterModalComponent, { filter: this.filters});
    filterModal.onDidDismiss( (data: { filter: string[] }) => this.filters = data.filter);
    filterModal.present();
  }


}
