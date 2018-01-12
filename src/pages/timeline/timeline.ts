import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";

import {EVENT_CATEGORIES} from '../../models/event-category';
import {IAlert, IAlertWithIcon} from '../../models/alert.interface';
import {Subscription} from "rxjs/Subscription";
import {TimelineFilter} from "../../models/timeline-filter";
import {AngularFirestoreCollection, DocumentChangeAction} from "angularfire2/firestore";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class HomePage {
  items: IAlertWithIcon[] = [];
  filters: any;
  subscription: Subscription;
  alertsPerPage: number = 10;
  lastIndexAlertPerpage: number =0;
  displayItems: IAlertWithIcon[] = [];
  alertCollectionRef : AngularFirestoreCollection<any>;
  private firstLoad = true;

  private lastDoc : any;
  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public navParams: NavParams) {
  }

  ngOnInit() {
    this.alertCollectionRef = this.firebaseProvider.getCollection('alerts','timestamp','desc',50);
    this.refreshSubscription();
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
    if(this.items && this.items.length >= endIndex){
      this.displayItems.push(...this.items.slice(this.lastIndexAlertPerpage, endIndex));
      this.lastIndexAlertPerpage = this.displayItems.length;
    } else {
      this.alertCollectionRef = this.firebaseProvider.getCollection('alerts','timestamp','desc',50, this.lastDoc);
      if (this.subscription) { this.subscription.unsubscribe(); }
      this.subscription = this.listenAlertStream();
    }
  }

  listenAlertStream(filter?: TimelineFilter): Subscription {
    return this.alert$()
     // .filter((alert: IAlert) =>  !filter.entityId || alert.entityId === filter.entityId)
     // .filter((alert: IAlert) =>  !filter.entityCategories || filter.entityCategories.some( t => t === alert.entityCategory))
     // .filter((alert: IAlert) =>  !filter.eventCategories || filter.eventCategories.some( t => t === alert.eventCategory))
     // .filter( (alert: IAlert) => !filter.searchInput || this.alertContains(alert, filter.searchInput))
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
          if(!alertWithIcon.firstLoad){
            this.displayItems.unshift(alertWithIcon);
          } else if( this.displayItems.length < this.alertsPerPage ) {
            this.displayItems.unshift(alertWithIcon);
            this.lastIndexAlertPerpage = this.displayItems.length;
          }
        },
        error => console.error(error),
        () => console.log('completed'));
  }

  private alert$() {
    return this.alertCollectionRef.stateChanges(['added'])
      .flatMap(arr => {
        let o = Observable.combineLatest(Observable.of(this.firstLoad), Observable.from(arr));
        this.firstLoad = false;
        return o;
      })
      .map( ([load, firebaseAlert]: [boolean, DocumentChangeAction]) => {
        this.lastDoc = firebaseAlert.payload.doc;
        return [load, firebaseAlert.payload.doc.data()]
      })
      .map( ([load, firebaseAlert]: [boolean, any]) => {
        return {
          id: firebaseAlert.id,
          entityName: firebaseAlert.entity_name,
          entityCategory: firebaseAlert.entity_category,
          entityId: firebaseAlert.entity_id,
          eventCategory: firebaseAlert.event_category,
          message: firebaseAlert.message,
          timestamp: firebaseAlert.timestamp,
          firstLoad: load
        }
      });
  }

  onFilterChange($event: any) {
    this.filters = $event;
    this.refreshSubscription(Object.assign({}, $event));
  }

  refreshSubscription(filter?: TimelineFilter) {
    if (this.subscription) { this.subscription.unsubscribe(); }
    this.displayItems = [];
    this.lastIndexAlertPerpage = 0;
    this.subscription = this.listenAlertStream(filter);
  }

  private alertContains(alert: IAlert, searchInput: string): boolean {
    return Object.keys(alert)
      .map(key => alert[key])
      .reduce( (acc, cur) => acc + cur, "")
      .indexOf(searchInput) > -1;
  }
}
