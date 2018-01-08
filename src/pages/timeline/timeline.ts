import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {ElasticsearchProvider} from "../../providers/elasticsearch/elasticsearch";

@Component({
  selector: 'page-home',
  templateUrl: 'timeline.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public firebaseProvide: FirebaseProvider, public elasticSearch: ElasticsearchProvider) {


  }

}
