import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ElasticsearchProvider} from "../../providers/elasticsearch/elasticsearch";

@Component({
  selector: 'page-about',
  templateUrl: 'entities.html'
})
export class AboutPage {

  results: String = "";

  constructor(public navCtrl: NavController, public elasticsearch: ElasticsearchProvider) {

  }

  onInput(event){
    this.elasticsearch.fullTextSearch('tracker', '*' + event.target.value + '*').then(
      response => {
        for (let result of response.hits.hits) {
          console.log(result._source.entity);
        }
      }, error => {
        console.error(error);
      }).then(() => {
      console.log('Search Completed!');
    });

    console.log("onInput" + event.target.value);
  }

  response(response){
    console.log("response" + response.hits);
  }

  error(){
    console.log("error");
  }

  onCancel(){
    console.log("onCancel");
  }
}
