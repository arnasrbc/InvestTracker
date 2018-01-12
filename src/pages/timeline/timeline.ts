import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {Entity} from '../../models/entity';
import {EVENT_CATEGORIES} from '../../models/event-category';
import {IAlertWithIcon} from '../../models/alert.interface';
import {Subscription} from "rxjs/Subscription";
import {TimelineFilter} from "../../models/timeline-filter";
import {Observable} from "rxjs/Observable";
import {TimelineBodyComponent} from "../../components/timeline-body/timeline-body";

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class HomePage {
  items: IAlertWithIcon[] = [];
  newItems: IAlertWithIcon[] = [];
  filters: any;
  subscription: Subscription;
  selectedEntity : Entity;
  @ViewChild(TimelineBodyComponent)
  timeLineBody: TimelineBodyComponent;

  @Output()
  updateNumberOfNewItems: EventEmitter<number>;

  private lastDoc: any;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public navParams: NavParams) {
    this.updateNumberOfNewItems = new EventEmitter<number>();
  }

  defineIconByEventCategory(eventCategory: string) {

    const event = EVENT_CATEGORIES.find(i => i.code == eventCategory);
    if (event) {
      return event.icon;
    }
  }

  defineTitleByEventCategory(eventCategory: string) {

    const event = EVENT_CATEGORIES.find(i => i.code == eventCategory);
    if (event) {
      return event.label;
    }
  }

  ionViewDidLoad() {
    this.selectedEntity = this.navParams.data.entity;
    const entityId = this.selectedEntity ? this.selectedEntity.entityId : undefined;
    const filter = Object.assign({}, this.filters, { entityId: entityId});
    this.singleTimeElementLoad(20, filter);
    this.refreshSubscription(filter);
  }

  infiniteScrollDown() {
    const entityId = this.selectedEntity ? this.selectedEntity.entityId : undefined;
    this.singleTimeElementLoad(20, Object.assign({}, this.filters, { entityId: entityId}),  this.lastDoc);
  }

  refreshScrollUp() {
    this.items.unshift( ...this.newItems.splice(0, Math.max(20, this.newItems.length - 1))  );
    this.updateNumberOfNewItems.emit(this.newItems.length);
    setTimeout( () => {
      this.timeLineBody.finishScrollUp();
    }, 1000);
    console.log('items', this.items);
  }

  listenAlertStream(filter?: TimelineFilter): Subscription {
    return this.firebaseProvider.collectionAfterGivenTime('alerts', new Date(), filter)
      .stateChanges(['added'])
      .flatMap(arr => Observable.from(arr))
      .map( fireAlert => this.firebaseToIAlertWithIcon(fireAlert.payload.doc.data()))
      .subscribe(
        (alertWithIcon: IAlertWithIcon) => {
          this.newItems.unshift(alertWithIcon);
          console.log(this.newItems);
          this.updateNumberOfNewItems.emit(this.newItems.length);
        },
            error => console.error(error),
            () => console.log('completed')
        );
  }

  onFilterChange($event: any) {
    this.filters = $event;
    this.refreshSubscription(Object.assign({}, $event));
  }

  refreshSubscription(filter?: TimelineFilter) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.listenAlertStream(filter);
  }

  private singleTimeElementLoad(numberOfElements: number, filter?: TimelineFilter, startDoc?: any) {
    this.firebaseProvider.getCollection('alerts', 'timestamp', 'desc', numberOfElements, filter, startDoc)
      .stateChanges().first()
      .flatMap(arr => Observable.from(arr))
      .map( doc => this.saveLastDocumentAndExtractDataFromFirebaseDoc(doc))
      .map( fireAlert => this.firebaseToIAlertWithIcon(fireAlert))
      .reduce((acc: any[], i) => acc.concat(i), [])
      .toPromise()
      .then((alerts: IAlertWithIcon[]) => {
          this.timeLineBody.finishScrollDown();
          this.items.push(...alerts);
        }, console.log)
      .catch(console.log);
  }

  private saveLastDocumentAndExtractDataFromFirebaseDoc(doc) {
    this.lastDoc = doc.payload.doc;
    return doc.payload.doc.data()
  }

  private firebaseToIAlertWithIcon(firebaseAlert: any) {
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
      };
  }
}
