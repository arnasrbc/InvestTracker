import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IAlertWithIcon} from '../../models/alert.interface';
import {PopoverController} from 'ionic-angular';

@Component({
  selector: 'timeline-body',
  templateUrl: 'timeline-body.html'
})
export class TimelineBodyComponent {

  private infiniteScroll;

  @Output()
  doInfiniteScroll: EventEmitter<void>;

  @Input('items') items : IAlertWithIcon[];4

  constructor(public popoverCtrl: PopoverController) {
    this.doInfiniteScroll = new EventEmitter<void>();
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.doInfiniteScroll.emit();
  }

  finish() {
    if (this.infiniteScroll) {
      this.infiniteScroll.complete();
    }
  }

  toggleDetails(item) {
    item.showDetails = !item.showDetails;
  }

}
