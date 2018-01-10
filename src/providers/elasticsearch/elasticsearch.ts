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

  fullTextSearch(_index, _queryText): any {
    return this.client.search({
      index: _index,
      q: _queryText
    });
  }

  a(_index, _queryText, _fields) {
    console.log('aaa')
    return this.client.search({
      index: "tracker",
      body: {
        query: {
          "bool": {
            "must": [
              {
                "query_string": {
                  "query": "a"
                }
              },
              {
                "terms":
                  {
                    "entity_category.keyword" : [ "SHARE_CLASS", "LEGAL_FUND"]
                  }
              }
            ]
          }
        }
      }
    });
  }

}


