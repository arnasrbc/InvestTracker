import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {IAlert, IAlertWithIcon} from '../../models/alert.interface';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class HomePage {
  items: IAlertWithIcon[] = [];
  filters: string[];
  subscription: Subscription;

  constructor(public navCtrl: NavController, public firebaseProvide: FirebaseProvider, public navParams: NavParams) {
    this.subscription = this.listenAlertStream();
  }

  defineIconByEventCategory(){
    return 'add-circle';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad tab1Page');
    this.refreshSubscription({entityOrEvent: this.filters, entityName: this.navParams.data.entity })
  }


  listenAlertStream(filter?: {entityOrEvent?: string[], entityName?: string }): Subscription {
    this.items = [];
    return this.firebaseProvide.alert$()
      .filter((alert: IAlert) => !filter.entityName || alert.entity === filter.entityName)
      .filter((alert: IAlert) => !filter.entityOrEvent ||
             filter.entityOrEvent.some( t => t === alert.entityCategory || t === alert.eventCategory))
      .map(alert => Object.assign({}, alert, {icon : this.defineIconByEventCategory()}))
      .subscribe(
        (alertWithIcon: IAlertWithIcon) => {
          this.items.unshift(alertWithIcon);
        },
        error => {
          console.error(error);
        },
        () => console.log('completed')
      );

  }

  updateFiltering($event: string[]) {
    this.filters = $event;
    this.refreshSubscription({entityOrEvent: $event});
  }

  refreshSubscription(filter:{entityOrEvent?: string[], entityName?: string }) {
    this.subscription.unsubscribe();
    this.subscription = this.listenAlertStream(filter);
  }

}
