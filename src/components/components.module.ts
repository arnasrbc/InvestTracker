import {NgModule} from '@angular/core';
import {TimelineFilterComponent} from './timeline-filter/timeline-filter';
import {TimelineFilterModalComponent} from './timeline-filter-modal/timeline-filter-modal';
import {IonicModule} from 'ionic-angular';

@NgModule({
  declarations: [
    TimelineComponent,
    TimelineFilterComponent,
    TimelineFilterModalComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    TimelineComponent,
    TimelineFilterComponent,
    TimelineFilterModalComponent
  ],
  entryComponents: [
    TimelineFilterModalComponent
  ]
})
export class ComponentsModule {
}
