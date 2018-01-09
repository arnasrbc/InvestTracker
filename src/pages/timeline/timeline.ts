import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {IAlertWithIcon} from '../../models/alert.interface';

@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class HomePage {
  items: IAlertWithIcon[] = [];

  constructor(public navCtrl: NavController, public firebaseProvide: FirebaseProvider, public navParams: NavParams) {
    this.listenAlertStream();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad tab1Page');
    this.firebaseProvide.alertsByCategory$(this.navParams.data.entityCategory);
  }

  listenAlertStream() {
    return this.firebaseProvide.alert$()
      .map(alert => Object.assign({}, alert, {icon: 'add-circle'}))
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
