import { Component, Input } from '@angular/core';

@Component({
  selector: 'timeline',
  templateUrl: 'timeline.html'
})
export class TimelineComponent {
  @Input('endIcon') endIcon = "ionic";
  constructor() {

  }

}

@Component({
  selector: 'timeline-item',
  template: '<ng-content></ng-content>'
})
export class TimelineItemComponent{
  constructor(){

  }
}


@Component({
  selector:'timeline-time',
  template: '<span>{{time | date: "dd/MM/yyyy"}}</span> <span>{{time | date: "hh:mm"}}</span>'
})
export class TimelineTimeComponent{
  @Input('time') time = {};
  constructor(){

  }
}