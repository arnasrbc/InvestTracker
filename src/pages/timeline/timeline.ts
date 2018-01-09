import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {ElasticsearchProvider} from "../../providers/elasticsearch/elasticsearch";
import { AngularFirestore } from 'angularfire2/firestore';
import { IAlert } from '../../model/IAlert';

@Component({
  selector: 'page-home',
  templateUrl: 'timeline.html'
})
export class HomePage {
  items: IAlert[] = [];
  constructor(public navCtrl: NavController, public firebaseProvide: FirebaseProvider) {
   this.getItems();
  }

  getItems(){
    return this.firebaseProvide.getAlerts().subscribe(
      list => {
        console.log(list);
        this.items = list;
      },
      error => {
        console.error(error);
      }, 
      () => console.log()
    );
    
  }

}
