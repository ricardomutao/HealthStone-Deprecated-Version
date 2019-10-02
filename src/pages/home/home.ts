import { Component } from '@angular/core';
import { } from 'ionic-angular';
import { NavController, App, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, app: App, menu: MenuController) {
    menu.enable(true);
  }
  
}
