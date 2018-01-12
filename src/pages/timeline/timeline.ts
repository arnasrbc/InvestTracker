import {Component, SimpleChanges} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";

import {EVENT_CATEGORIES} from '../../models/event-category';
import {IAlert, IAlertWithIcon} from '../../models/alert.interface';
import {Subscription} from "rxjs/Subscription";
import {TimelineFilter} from "../../models/timeline-filter";
import {AngularFirestoreCollection, DocumentChangeAction} from "angularfire2/firestore";
import {Observable} from "rxjs/Rx";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class HomePage {
  items: IAlertWithIcon[] = [];
  newItems: IAlertWithIcon[] = [];
  filters: any;
  subscription: Subscription;
  alertCollectionRef : AngularFirestoreCollection<any>;
  newAlertCollectionRef: AngularFirestoreCollection<any>; //create a query with a where timestamp >= now
  infiniteCompleted: Subject<any> = new Subject()

  //TODO: Subscribe to new Alert collection and put in newItems
  //TODO: Add an infinite-scroll up to populate items from newItems (unshifting)
  //TODO: Infinite commpleted needs a timeout or another way to deal with

  private lastDoc : any;
  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public navParams: NavParams) {
  }

  ngOnInit() {
    this.alertCollectionRef = this.firebaseProvider.getCollection('alerts','timestamp','desc',20);
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
      this.alertCollectionRef = this.firebaseProvider.getCollection('alerts','timestamp','desc',20, this.lastDoc);
      if (this.subscription) { this.subscription.unsubscribe(); }
      this.subscription = this.listenAlertStream(this.alertCollectionRef);
  }

  listenAlertStream(collection: AngularFirestoreCollection<any>, filter?: TimelineFilter): Subscription {
    let lastFetch = 0;
    return this.alert$(collection)
     // .filter((alert: IAlert) =>  !filter.entityId || alert.entityId === filter.entityId)
     // .filter((alert: IAlert) =>  !filter.entityCategories || filter.entityCategories.some( t => t === alert.entityCategory))
     // .filter((alert: IAlert) =>  !filter.eventCategories || filter.eventCategories.some( t => t === alert.eventCategory))
     // .filter( (alert: IAlert) => !filter.searchInput || this.alertContains(alert, filter.searchInput))
      .subscribe(
        (alertWithIcon: IAlertWithIcon) =>  {
          this.items.push(alertWithIcon);
          lastFetch++;
          if (lastFetch > 20) {
             this.infiniteCompleted.next('complete');
          }
        },
        error => console.error(error),
        () => {
          console.log('completed');
        });
  }

  private alert$(collection: AngularFirestoreCollection<any>) {
    return collection.stateChanges(['added'])
      .map( ([firebaseAlert]: [DocumentChangeAction]) => {
        this.lastDoc = firebaseAlert.payload.doc;
        return [firebaseAlert.payload.doc.data()]
      })
      .map( ([firebaseAlert]: [any]) => {
        return {
          id: firebaseAlert.id,
          entityName: firebaseAlert.entity_name,
          entityCategory: firebaseAlert.entity_category,
          entityId: firebaseAlert.entity_id,
          eventCategory: firebaseAlert.event_category,
          message: firebaseAlert.message,
          timestamp: firebaseAlert.timestamp,
          icon: this.defineIconByEventCategory(firebaseAlert.event_category),
          title: this.defineTitleByEventCategory(firebaseAlert.event_category)
        }
      });
  }

  onFilterChange($event: any) {
    this.filters = $event;
    this.refreshSubscription(Object.assign({}, $event));
  }

  refreshSubscription(filter?: TimelineFilter) {
    if (this.subscription) { this.subscription.unsubscribe(); }
    this.subscription = this.listenAlertStream(this.alertCollectionRef, filter);
  }

}
