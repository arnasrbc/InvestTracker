import { Component } from '@angular/core';

import { AboutPage } from '../entities/entities';
import { ContactPage } from '../configuration/configuration';
import { HomePage } from '../timeline/timeline';
import {Events} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  newItemsNumber = 0;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public events: Events) {
    this.events.subscribe('newItemsNumber', (newItemsNumber) => {
      this.newItemsNumber = newItemsNumber;
    });
  }
}
