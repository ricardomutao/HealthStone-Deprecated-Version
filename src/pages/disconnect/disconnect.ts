import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { HomePage } from '../home/home';
import { LoginPage } from '../account/login/login';

/**
 * Generated class for the DisconnectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-disconnect',
  templateUrl: 'disconnect.html',
})
export class DisconnectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public network: Network) {
    this.network.onConnect()
      .subscribe(() => {
        this.navCtrl.setRoot(HomePage.name); 
      });
  }

  ionViewDidLoad() {
  }

}
