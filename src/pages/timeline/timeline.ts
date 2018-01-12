import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";

import {EVENT_CATEGORIES} from '../../models/event-category';
import {IAlertWithIcon} from '../../models/alert.interface';
import {Subscription} from "rxjs/Subscription";
import {TimelineFilter} from "../../models/timeline-filter";
import {AngularFirestoreCollection, DocumentChangeAction} from "angularfire2/firestore";
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

  @ViewChild(TimelineBodyComponent)
  timeLineBody: TimelineBodyComponent;

  private lastDoc: any;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public navParams: NavParams) {}

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
    this.singleTimeElementLoad(20);
    this.refreshSubscription(Object.assign({}, this.filters, { entityId: this.navParams.data.entityId}));
  }

  infiniteScrollDown() {
    this.singleTimeElementLoad(20, this.lastDoc);
  }

  listenAlertStream(filter?: TimelineFilter): Subscription {
    return this.firebaseProvider.collectionAfterGivenTime('alerts', new Date())
      .stateChanges(['added'])
      .flatMap(arr => Observable.from(arr))
      .map( fireAlert => this.firebaseToIAlertWithIcon(fireAlert.payload.doc.data()))
      .subscribe(
        (alertWithIcon: IAlertWithIcon) => {
          this.newItems.unshift(alertWithIcon);
          console.log(this.newItems);
        },
            error => console.error(error),
            () => console.log('completed')
        );
  }

  private alert$(collection: AngularFirestoreCollection<any>) {
    return collection.stateChanges(['added'])
      .map(([firebaseAlert]: [DocumentChangeAction]) => {
        this.lastDoc = firebaseAlert.payload.doc;
        return firebaseAlert.payload.doc.data()
      })
      .do(c => console.log("bbbbb", c))
      .map((firebaseAlert: any) => {
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
      })
      .do(c => console.log("ccc", c));
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

  private singleTimeElementLoad(numberOfElements: number, startDoc?: any) {
    return this.firebaseProvider.getCollection('alerts', 'timestamp', 'desc', numberOfElements, startDoc)
      .stateChanges().first()
      .flatMap(arr => Observable.from(arr))
      .map( doc => this.saveLastDocumentAndExtractDataFromFirebaseDoc(doc))
      .map( fireAlert => this.firebaseToIAlertWithIcon(fireAlert))
      .reduce((acc: any[], i) => acc.concat(i), [])
      .toPromise()
      .then((alerts: IAlertWithIcon[]) => {
          this.timeLineBody.finish();
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
