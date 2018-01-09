import {NgModule} from '@angular/core';
import {TimelineFilterComponent} from './timeline-filter/timeline-filter';
import {TimelineFilterModalComponent} from './timeline-filter-modal/timeline-filter-modal';
import {IonicModule} from 'ionic-angular';

@NgModule({
  declarations: [
    TimelineFilterComponent,
    TimelineFilterModalComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    TimelineFilterComponent,
    TimelineFilterModalComponent
  ],
  entryComponents: [
    TimelineFilterModalComponent
  ]
})
export class ComponentsModule {
}
