import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ViewController, Alert } from 'ionic-angular';
import * as firebase from 'firebase';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';
import { ViewQuestPage } from '../view-quest/view-quest';

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

  param:any;

  alert: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public viewCtrl: ViewController,
    public utils: UtilsServiceProvider) {
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
    this.utils.loadingShow();

    this.alert = this.alertCtrl.create({
      subTitle:'',
      buttons: [
        { text: 'Ok',
          handler: () => {
            this.viewCtrl.dismiss({excluido: true});
          }
        }
      ]
    });

    firebase.database().ref(`quests/${btoa(this.param.id)}/`).remove().then(() => {
      this.utils.loadingHide();
      this.alert.setSubTitle('Missão excluida com sucesso!');
      this.alert.present();
      
    }).catch((error: Error) => {
      this.utils.loadingHide();
      this.utils.creatSimpleAlert('Erro ao remover missão');
    });
  }

  viewQuest(){
    this.navCtrl.push(ViewQuestPage.name, {questSelected: this.param });
    this.viewCtrl.dismiss();
  }

  concluirFinalizar(){
    const confirm = this.alertCtrl.create({
      title: 'Concluir e Finalizar Missão',
      message: 'Tem certeza que deseja concluir e finalizar essa missão?',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
          }
        },
        {
          text: 'Cancelar'
        }
      ]
    });
    confirm.present(); 
  }

  concluirManter(){
    const confirm = this.alertCtrl.create({
      title: 'Confirmar e Manter Missão',
      message: 'Tem certeza que deseja confirmar e manter essa missão?',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
          }
        },
        {
          text: 'Cancelar'
        }
      ]
    });
    confirm.present(); 
  }

  naoConcluido(){
    const confirm = this.alertCtrl.create({
      title: 'Missão não Concluida',
      message: 'Tem certeza que deseja marcar essa missão como não concluida?',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
          }
        },
        {
          text: 'Cancelar'
        }
      ]
    });
    confirm.present(); 
  }

}
