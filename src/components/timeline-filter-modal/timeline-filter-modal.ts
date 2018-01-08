import { Component } from '@angular/core';
import {ViewController} from "ionic-angular";

/**
 * Generated class for the TimelineFilterModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'timeline-filter-modal',
  templateUrl: 'timeline-filter-modal.html'
})
export class TimelineFilterModalComponent {

  text: string;

  constructor(private _viewCtrl: ViewController) {

  }

  dismiss() {
    this._viewCtrl.dismiss();
  }



}
