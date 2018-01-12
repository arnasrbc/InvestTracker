import {Component, EventEmitter, Input, Output} from '@angular/core';
import { IAlertWithIcon } from '../../models/alert.interface';
import { PopoverController} from 'ionic-angular';

@Component({
  selector: 'timeline-body',
  templateUrl: 'timeline-body.html'
})
export class TimelineBodyComponent {
  @Output()
  doInfiniteScroll: EventEmitter<void>;

  @Input('items') items : IAlertWithIcon[];
  constructor(public popoverCtrl: PopoverController) {
    this.doInfiniteScroll = new EventEmitter<void>();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.doInfiniteScroll.emit();

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }

  toggleDetails(item) {
    item.showDetails = !item.showDetails;
  }

}
