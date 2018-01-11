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
  alertsPerPage: number = 15;
  lastIndexAlertPerpage: number =0;
  displayItems: IAlertWithIcon[] = [];

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
    this.refreshSubscription(Object.assign({}, this.filters, { entityId: this.navParams.data.entityId}));
  }

  populateDisplayItems(){
    let endIndex = (this.alertsPerPage + this.lastIndexAlertPerpage);
    if(this.items && this.items.length > endIndex){
      console.log('slice', this.items.slice(this.lastIndexAlertPerpage, endIndex));
      this.displayItems.push(...this.items.slice(this.lastIndexAlertPerpage, endIndex));
      this.lastIndexAlertPerpage = this.displayItems.length;
    }
  }

  listenAlertStream(filter?: TimelineFilter): Subscription {
    this.items = [];
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
        (alertWithIcon: IAlertWithIcon) =>  {
          this.items.unshift(alertWithIcon);
          console.log('length',this.items.length);

          //If the Display Items is already loaded for the first time, we should add the new alert to the list
          if(this.displayItems && this.displayItems.length > 0){
            this.displayItems.unshift(alertWithIcon);
          }
        },
        error => console.error(error),
        () => console.log('completed'));
  }

  onFilterChange($event: any) {
    this.filters = $event;
    this.refreshSubscription(Object.assign({}, $event));
  }

  refreshSubscription(filter: TimelineFilter) {
    if (this.subscription) { this.subscription.unsubscribe(); }
    this.displayItems = [];
    this.lastIndexAlertPerpage = 0;
    this.subscription = this.listenAlertStream(filter);
    // setTimeout( () => {
      this.populateDisplayItems();
    // }, 5000);
  }

  private alertContains(alert: IAlert, searchInput: string): boolean {
    return Object.keys(alert)
      .map(key => alert[key])
      .reduce( (acc, cur) => acc + cur, "")
      .indexOf(searchInput) > -1;
  }
}
