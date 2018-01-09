import {Component, Input} from '@angular/core';
import { IAlertWithIcon } from '../../models/alert.interface';

@Component({
  selector: 'timeline',
  templateUrl: 'timeline-body.html'
})
export class TimelineBodyComponent {
  @Input('endIcon') endIcon = "ionic";
  @Input('items') items : IAlertWithIcon[];
  constructor() {

  }

}

@Component({
  selector: 'timeline-item',
  template: '<ng-content></ng-content>'
})
export class TimelineItemBodyComponent{
  constructor(){

  }
}


@Component({
  selector:'timeline-time',
  template: '<span>{{time | date: "dd/MM/yyyy"}}</span> <span>{{time | date: "hh:mm"}}</span>'
})
export class TimelineTimeBodyComponent{
  @Input('time') time = {};
  constructor(){

  }
}
