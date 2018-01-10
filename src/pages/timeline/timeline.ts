import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";

import {EVENT_CATEGORIES} from '../../models/event-category';
import {IAlert, IAlertWithIcon} from '../../models/alert.interface';
import {Subscription} from "rxjs/Subscription";
import {TimelineFilter} from "../../models/timeline-filter";

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class HomePage {
  items: IAlertWithIcon[] = [];
  filters: any;
  subscription: Subscription;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public navParams: NavParams) {
  }

  defineIconByEventCategory(eventCategory : string){

    const event = EVENT_CATEGORIES.find(i => i.code == eventCategory);
    if (event)
    {
      return event.icon;
    }
  }

  defineTitleByEventCategory(eventCategory : string){

    const event = EVENT_CATEGORIES.find(i => i.code == eventCategory);
    if (event)
    {
      return event.label;
    }
  }

  ionViewDidLoad() {
    this.refreshSubscription(Object.assign({}, this.filters, { entityId: this.navParams.data.entityId
    }));
  }


  listenAlertStream(filter?: TimelineFilter): Subscription {
    this.items = [];
    console.log(filter);
    return this.firebaseProvider.alert$()
      .filter((alert: IAlert) =>  !filter.entityId || alert.entityId === filter.entityId)
      .filter((alert: IAlert) =>  !filter.entityCategories || filter.entityCategories.some( t => t === alert.entityCategory))
      .filter((alert: IAlert) =>  !filter.eventCategories || filter.eventCategories.some( t => t === alert.eventCategory))
      .filter( (alert: IAlert) => !filter.searchInput || this.alertContains(alert, filter.searchInput))
      .map(alert => {
        return Object.assign({},
          alert,
          {
            icon: this.defineIconByEventCategory(alert.eventCategory),
            title: this.defineTitleByEventCategory(alert.eventCategory)
          });
      })
      .subscribe(
        (alertWithIcon: IAlertWithIcon) =>  this.items.unshift(alertWithIcon),
        error => console.error(error),
        () => console.log('completed'));
  }

  onFilterChange($event: any) {
    this.filters = $event;
    this.refreshSubscription(Object.assign({}, $event));
  }

  refreshSubscription(filter: TimelineFilter) {
    if (this.subscription) { this.subscription.unsubscribe(); }
    this.subscription = this.listenAlertStream(filter);
  }

  private alertContains(alert: IAlert, searchInput: string): boolean {
    return Object.keys(alert)
      .map(key => alert[key])
      .reduce( (acc, cur) => acc + cur, "")
      .indexOf(searchInput) > -1;
  }
}
