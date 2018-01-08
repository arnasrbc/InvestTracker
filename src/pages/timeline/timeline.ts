import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {ElasticsearchProvider} from "../../providers/elasticsearch/elasticsearch";
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'timeline.html'
})
export class HomePage {
  items: any[] = [];
  constructor(public navCtrl: NavController, public firebaseProvide: FirebaseProvider) {
   this.getItems();
  }

  getItems(){
    return this.firebaseProvide.getAlerts().subscribe(
      item => {
        console.log(item);
        this.items.push(item);
      },
      error => {
        console.error(error);
      }, 
      () => console.log()
    );
    
  }

}
