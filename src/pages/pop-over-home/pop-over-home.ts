import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController } from 'ionic-angular';
import { Quest } from '../../models/quest';
import * as firebase from 'firebase';

/**
 * Generated class for the PopOverHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop-over-home',
  templateUrl: 'pop-over-home.html',
})
export class PopOverHomePage {

  param:Quest;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController) {
      this.param = this.navParams.get('questSelected');
  }

  ionViewDidLoad() {
  }

  confirmRemove(){
    const confirm = this.alertCtrl.create({
      title: 'Remover Missão',
      message: 'Tem certeza que deseja remover esta missão?',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            this.removeQuest();
          }
        },
        {
          text: 'Cancelar'
        }
      ]
    });
    confirm.present();
  }

  removeQuest(){
    firebase.database().ref(`quests/${btoa(this.param.id)}/`).remove();
  }

}
