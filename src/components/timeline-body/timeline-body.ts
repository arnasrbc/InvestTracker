import {Component, EventEmitter, Input, Output} from '@angular/core';
import { IAlertWithIcon } from '../../models/alert.interface';
import { PopoverController} from 'ionic-angular';
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'timeline-body',
  templateUrl: 'timeline-body.html'
})
export class TimelineBodyComponent {

  private infiniteScroll;

  @Output()
  doInfiniteScroll: EventEmitter<void>;

  @Input()
  infiniteCompleted: Subject<any>;

  @Input('items') items : IAlertWithIcon[];
  constructor(public popoverCtrl: PopoverController) {
    this.doInfiniteScroll = new EventEmitter<void>();
  }

  ngOnInit() {
    this.infiniteCompleted.subscribe(event => {
      if (this.infiniteScroll) {
        this.infiniteScroll.complete();
      }
    });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.infiniteScroll = infiniteScroll;

    this.doInfiniteScroll.emit();
  }

  toggleDetails(item) {
    item.showDetails = !item.showDetails;
  }

}
