import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IAlertWithIcon} from '../../models/alert.interface';
import {PopoverController} from 'ionic-angular';
import {Entity} from "../../models/entity";
import {FirebaseProvider} from "../../providers/firebase/firebase";

@Component({
  selector: 'timeline-body',
  templateUrl: 'timeline-body.html'
})
export class TimelineBodyComponent {

  private infiniteScrollDown;
  private refreshUp;

  @Output()
  scrollDown: EventEmitter<void>;

  @Output()
  scrollUp: EventEmitter<void>;

  @Input('items') items : IAlertWithIcon[];
  @Input('entity') entity : Entity;
  constructor(public popoverCtrl: PopoverController, public firebaseProvider: FirebaseProvider) {
    this.scrollDown = new EventEmitter<void>();
    this.scrollUp = new EventEmitter<void>();
  }

  doInfiniteDown(infiniteScrollDown) {
    this.infiniteScrollDown = infiniteScrollDown;
    this.scrollDown.emit();
    this.firebaseProvider.setLastReadAlertId(this.items[this.items.length-1]);
  }

  doRefreshUp(refreshUp) {
    this.refreshUp = refreshUp;
    this.scrollUp.emit();
  }

  finishScrollDown() {
    if (this.infiniteScrollDown) {
      this.infiniteScrollDown.complete();
    }
  }

  finishScrollUp() {
    console.log('finish scroll up');
    if (this.refreshUp) {
      this.refreshUp.complete();
    }
  }

  toggleDetails(item) {
    item.showDetails = !item.showDetails;
  }

}
