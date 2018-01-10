import {Component, EventEmitter, Input, Output} from '@angular/core';
import { IAlertWithIcon } from '../../models/alert.interface';

@Component({
  selector: 'timeline-body',
  templateUrl: 'timeline-body.html'
})
export class TimelineBodyComponent {
  @Output()
  doInfiniteScroll: EventEmitter<void>;

  @Input('items') items : IAlertWithIcon[];
  constructor() {
    this.doInfiniteScroll = new EventEmitter<void>();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.doInfiniteScroll.emit();

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1500);
  }

}
