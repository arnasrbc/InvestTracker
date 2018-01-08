import { Injectable } from '@angular/core';
import {Client} from "elasticsearch";

@Injectable()
export class ElasticsearchProvider {

  private client : Client;

  constructor() {
    this.client = new Client({
      host: 'https://elastic:oHUd3Y9h7UXvWVLhW6bKRdnu@11f8f4203833884eb95e42ff196e3fba.eu-west-1.aws.found.io:9243',
      log: 'info'
    });
    console.log('Elastic connected');
  }

}
