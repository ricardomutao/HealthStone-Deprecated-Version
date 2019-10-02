import { Component } from '@angular/core';
import { } from 'ionic-angular';
import { NavController, App, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  constructor(public navCtrl: NavController, app: App, menu: MenuController) {
    menu.enable(true);
  }
  
}
