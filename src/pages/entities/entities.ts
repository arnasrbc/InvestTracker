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
  total: number;
  entitiesFilter: string[];
  private searchInput: string;

  constructor(public navCtrl: NavController, public elasticsearch: ElasticsearchProvider, private _modalCtrl: ModalController) {
    this.entities = [];
    this.total = 0;
  }

  onClick(entityId){
    this.navCtrl.push(HomePage, {entityId: entityId});
  }

  onInput(event){
    this.searchInput = event.target.value;
    this.updateEntitiesList();
    console.log("onInput" + event.target.value);
  }

  private updateEntitiesList() {

    let elasticSearchPromise;

    if (this.entitiesFilter && this.entitiesFilter.length > 0) {
      elasticSearchPromise = this.elasticsearch.fullTextSearchWithEntityCategoryFilter('tracker', '*' + this.searchInput + '*', this.entitiesFilter);
    } else {
      elasticSearchPromise =this.elasticsearch.fullTextSearch('tracker', '*' + this.searchInput + '*');
    }

    elasticSearchPromise.then(
      (response) => {
        this.entities = [];

        this.total = response.hits.total;
        for (let result of response.hits.hits) {
          const entity = result._source;
          this.entities.push(new Entity(entity.entity_id, entity.entity_name, entity.entity_category))
        }
      }, error => {
        console.error(error);
      }).then(() => {
      console.log('Search Completed!');
    });
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

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

  }

  presentFilterModal() {
    let filterModal = this._modalCtrl.create(EntitiesFilterModalComponent, { filter: this.entitiesFilter});
    filterModal.onDidDismiss( (data: { filter: any }) => {
      this.entitiesFilter = data.filter;
      this.updateEntitiesList();
    });
    filterModal.present();
  }
}
