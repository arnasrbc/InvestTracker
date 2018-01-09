import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {IAlertWithIcon} from '../../models/alert.interface';
import {EVENT_CATEGORIES} from '../../models/event-category';

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class HomePage {
  items: IAlertWithIcon[] = [];

  constructor(public navCtrl: NavController, public firebaseProvide: FirebaseProvider, public navParams: NavParams) {
    this.listenAlertStream();
  }


  defineIconByEventCategory(eventCategory : string){

    var event = EVENT_CATEGORIES.find(i => i.code == eventCategory);
    if (event)
    {
      return event.icon;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad tab1Page');
    this.firebaseProvide.alertsByCategory$(this.navParams.data.entityCategory);

  }

  listenAlertStream() {
    return this.firebaseProvide.alert$()
      .map(alert => Object.assign({}, alert, {icon : this.defineIconByEventCategory(alert.eventCategory)}))
      .subscribe(
        (alertWithIcon: IAlertWithIcon) => {
          console.log(alertWithIcon);
          this.items.unshift(alertWithIcon);
        },
        error => {
          console.error(error);
        },
        () => console.log('completed')
      );

  }
}
