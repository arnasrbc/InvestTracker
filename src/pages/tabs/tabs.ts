import { Component } from '@angular/core';

import { AboutPage } from '../entities/entities';
import { ContactPage } from '../configuration/configuration';
import { HomePage } from '../timeline/timeline';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
