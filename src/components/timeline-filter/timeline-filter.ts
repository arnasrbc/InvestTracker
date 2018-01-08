import { Component } from '@angular/core';
import {ModalController} from "ionic-angular";
import {TimelineFilterModalComponent} from "../timeline-filter-modal/timeline-filter-modal";

@Component({
  selector: 'timeline-filter',
  templateUrl: 'timeline-filter.html'
})
export class TimelineFilterComponent {

  searchInput: string;

  constructor(private _modalCtrl: ModalController) {}

  presentFilterModal() {
    let filterModal = this._modalCtrl.create(TimelineFilterModalComponent, { test: 'test'});
    filterModal.present();
  }



}
