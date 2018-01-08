import { Component } from '@angular/core';

/**
 * Generated class for the TimelineFilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'timeline-filter',
  templateUrl: 'timeline-filter.html'
})
export class TimelineFilterComponent {

  text: string;

  constructor() {
    console.log('Hello TimelineFilterComponent Component');
    this.text = 'Hello World';
  }

}
