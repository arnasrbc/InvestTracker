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
  filters: string[];
  subscription: Subscription;
  alertsPerPage: number = 5;
  lastIndexAlertPerpage: number =0;
  displayItems: IAlertWithIcon[] = [];

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public navParams: NavParams) {
    //this.subscription = this.listenAlertStream();
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
    console.log('ionViewDidLoad tab1Page', this.navParams);
    this.refreshSubscription({ entityCategories: this.filters,
      entityId: this.navParams.data.entityId
    });
    this.populateDisplayItems(); 
  }

  populateDisplayItems(){
    var endIndex = (this.alertsPerPage + this.lastIndexAlertPerpage);

    if(this.items && this.items.length > endIndex){
      this.displayItems = this.items.slice(this.lastIndexAlertPerpage, this.alertsPerPage);
      this.lastIndexAlertPerpage = this.displayItems.length;
    }
  }

  listenAlertStream(filter?: TimelineFilter): Subscription {
    this.items = [];
    console.log(filter);
    return this.firebaseProvider.alert$()
      .filter((alert: IAlert) => !filter.entityId || alert.entityId === filter.entityId)
      .do( (alert:IAlert )=> console.log('2', alert.entityId))
      // todo @Florian change condition .filter((alert: IAlert) => !filter.entityCategories || filter.entityCategories.some( t => t === alert.entityCategory))
      // todo @Florian change condition .filter((alert: IAlert) => !filter.eventCategories || filter.eventCategories.some( t => t === alert.eventCategory))
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

          //If the Display Items is already loaded for the first time, we should add the new alert to the list
          if(this.displayItems){
            this.displayItems.unshift(alertWithIcon);
          }
        },
        error => console.error(error),
        () => console.log('completed'));
  }

  onFilterChange($event: string[]) {
    this.filters = $event;
    this.refreshSubscription({ entityCategories: $event } );
  }

  refreshSubscription(filter: TimelineFilter) {
    if (this.subscription) { this.subscription.unsubscribe(); }
    this.subscription = this.listenAlertStream(filter);
  }

}
