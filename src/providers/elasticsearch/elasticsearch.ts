import {Injectable} from '@angular/core';
import {Client} from "elasticsearch";

@Injectable()
export class ElasticsearchProvider {

  private client: Client;

  constructor() {
    this.client = new Client({
      host: 'https://elastic:oHUd3Y9h7UXvWVLhW6bKRdnu@11f8f4203833884eb95e42ff196e3fba.eu-west-1.aws.found.io:9243',
      log: 'info'
    });
    console.log('Elastic connected');
  }

  fullTextSearch(_index, _queryText, scrollTime): any {
    let params : any = {
      index: _index,
      q: _queryText
    };
    if (scroll) {
      params.scroll = scrollTime;
    }
    return this.client.search(params);
  }

  nextPage (scrollTime, scrollId): any {
    return this.client.scroll({
      scroll: scrollTime,
      scrollId: scrollId
    })
  }

  fullTextSearchWithEntityCategoryFilter(_index, _queryText, categories: string[]): any {
    return this.client.search({
      index: _index,
      body: {
        query: {
          "bool": {
            "must": [
              {
                "query_string": {
                  "query": _queryText
                }
              },
              {
                "terms":
                  {
                    "entity_category.keyword" : categories.map( c => c.toUpperCase())
                  }
              }
            ]
          }
        }
      }
    });
  }

}


