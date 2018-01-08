import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ElasticsearchProvider } from "../../providers/elasticsearch/elasticsearch";
import { Entity } from '../../models/entity';

@Component({
  selector: 'page-about',
  templateUrl: 'entities.html'
})
export class AboutPage {

  entities: Entity[];

  constructor(public navCtrl: NavController, public elasticsearch: ElasticsearchProvider) {
    this.entities = [];
  }

  onInput(event){
    this.elasticsearch.fullTextSearch('tracker', '*' + event.target.value + '*').then(
      (response) => {
        for (let result of response.hits.hits) {
          const entity = result._source;
          this.entities.push(new Entity(entity.entity, entity.entity_name, entity.entity_category))
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
