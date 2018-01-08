import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'entities.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }

  onInput(){
    console.log("onInput");
  }

  onCancel(){
    console.log("onCancel");
  }
}
