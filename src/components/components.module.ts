import {NgModule} from '@angular/core';
import {TimelineFilterComponent} from './timeline-filter/timeline-filter';
import {TimelineFilterModalComponent} from './timeline-filter-modal/timeline-filter-modal';
import {IonicModule} from 'ionic-angular';
t import {EntitiesFilterModalComponent} from "./entities-filter-modal/entities-filter-modal";

@NgModule({
  declarations: [
    TimelineFilterComponent,
    TimelineFilterModalComponent,
    EntitiesFilterModalComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    TimelineFilterComponent,
    TimelineFilterModalComponent,
    EntitiesFilterModalComponent
  ],
  entryComponents: [
    TimelineFilterModalComponent,
    EntitiesFilterModalComponent
  ]
})
export class ComponentsModule {
}
