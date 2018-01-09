import {Component, Input} from '@angular/core';
import { IAlertWithIcon } from '../../models/alert.interface';

@Component({
  selector: 'timeline-body',
  templateUrl: 'timeline-body.html'
})
export class TimelineBodyComponent {
  @Input('items') items : IAlertWithIcon[];
  constructor() {

  }

}
