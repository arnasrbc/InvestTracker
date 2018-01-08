import { NgModule } from '@angular/core';
import { TimelineFilterComponent } from './timeline-filter/timeline-filter';
import { TimelineComponent } from './timeline/timeline';
@NgModule({
	declarations: [TimelineFilterComponent,
    TimelineComponent],
	imports: [],
	exports: [TimelineFilterComponent,
    TimelineComponent]
})
export class ComponentsModule {}
