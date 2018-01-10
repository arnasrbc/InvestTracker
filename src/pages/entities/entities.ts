import {Component} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {ElasticsearchProvider} from "../../providers/elasticsearch/elasticsearch";
import {Entity} from '../../models/entity';
import {HomePage} from '../timeline/timeline';
import {EntitiesFilterModalComponent} from "../../components/entities-filter-modal/entities-filter-modal";

@Component({
  selector: 'page-entities',
  templateUrl: 'entities.html'
})
export class AboutPage {

  entities: Entity[];
  entitiesFilter: string[];

  constructor(public navCtrl: NavController, public elasticsearch: ElasticsearchProvider, private _modalCtrl: ModalController) {
    this.entities = [];
  }

  onClick(entityId){
    this.navCtrl.push(HomePage, {entityId: entityId});
  }

  onInput(event){
    this.elasticsearch.fullTextSearch('tracker', '*' + event.target.value + '*').then(
      (response) => {
        this.entities = [];
        for (let result of response.hits.hits) {
          const entity = result._source;
          this.entities.push(new Entity(entity.entity_id, entity.entity_name, entity.entity_category))
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

  presentFilterModal() {
    let filterModal = this._modalCtrl.create(EntitiesFilterModalComponent, { filter: this.entitiesFilter});
    filterModal.onDidDismiss( (data: { filter: any }) => {
      this.entitiesFilter = data.filter;
      this.elasticsearch.a(null, "a", null).then(
        res => console.log(res)
      )
    });
    filterModal.present();
  }
}
