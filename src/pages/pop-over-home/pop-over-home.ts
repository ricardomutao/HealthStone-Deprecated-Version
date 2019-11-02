import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ViewController, Alert } from 'ionic-angular';
import * as firebase from 'firebase';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';
import { ViewQuestPage } from '../view-quest/view-quest';
import { User } from '../../models/user';
import { PopOverInfoPage } from '../pop-over-info/pop-over-info';

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
  control:any;
  remButtonShow:any;

  alert: Alert;

  user:User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public popoverCtrl: PopoverController,
    public viewCtrl: ViewController,
    public utils: UtilsServiceProvider) {
  }

  ionViewDidLoad() {
    this.param = this.navParams.get('questSelected');
    this.control = this.navParams.get('pageControl');
    this.user = this.navParams.get('user');
    this.remButtonShow = this.navParams.get('remButton');
  }

  confirmRemove(){
    const confirm = this.alertCtrl.create({
      title: 'Remover Missão',
      message: 'Tem certeza que deseja remover esta missão?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.removeQuest();
          }
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
            this.viewCtrl.dismiss({reload: true});
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

  confirmConcluir(){
    const confirm = this.alertCtrl.create({
      title: 'Concluir Missão',
      message: 'Tem certeza que deseja concluir essa missão?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.concluirMissao();
          }
        }
      ]
    });
    confirm.present(); 
  }

  concluirMissao(){
    this.utils.loadingShow();
    this.user.ticket += this.param.dificuldade;
    this.user.xp += (this.param.dificuldade * 10);

    if(this.user.xp >= this.user.xpMax){
      this.user.level += 1;
      this.user.xp = 0 + (this.user.xp - this.user.xpMax);
      this.user.hpMax += Math.ceil(this.user.level * 0.5);
      this.user.xpMax = Math.ceil(100 + Math.pow((this.user.level * 1.5), 2));
    }

    this.user.hp += (this.user.hp + (this.user.level * this.param.dificuldade)) > this.user.hpMax ? (this.user.hpMax - this.user.hp) : (this.user.level * this.param.dificuldade);

    let objUpdate = {
      ticket: this.user.ticket,
      xp: this.user.xp,
      level: this.user.level,
      hpMax: this.user.hpMax,
      xpMax: this.user.xpMax,
      hp: this.user.hp
    }

    firebase.database().ref(`usuarios/${btoa(this.user.email)}`).update(objUpdate).then(() =>{

      this.utils.loadingHide();
      this.confirmManterFinalizar(objUpdate);

    }).catch((error: Error) => {
      this.utils.loadingHide();
      this.utils.creatSimpleAlert('Erro na operação');
    })
  }

  confirmNaoConcluido(){
    const confirm = this.alertCtrl.create({
      title: 'Missão não Concluida',
      message: 'Tem certeza que deseja marcar essa missão como não concluida?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.naoConcluirMissao();
          }
        }
      ]
    });
    confirm.present(); 
  }

  naoConcluirMissao(){
    this.utils.loadingShow();

    if(this.user.ticket > 0){
      this.user.ticket -= 1;
    }

    this.user.hp -= Math.floor((this.user.level * this.param.dificuldade)*1.33);

    if(this.user.hp <= 0){
      this.user.hp = 0;
      this.user.ticket = 0;
    }

    let objUpdate = {
      ticket: this.user.ticket,
      hpMax: this.user.hpMax,
      hp: this.user.hp
    }

    firebase.database().ref(`usuarios/${btoa(this.user.email)}`).update(objUpdate).then(() =>{

      this.utils.loadingHide();
      this.confirmNaoConcluiAction(objUpdate);
      

    }).catch((error: Error) => {
      this.utils.loadingHide();
      this.utils.creatSimpleAlert('Erro na operação');
    })
  }

  confirmNaoConcluiAction(obj){
    const confirm = this.alertCtrl.create({
      title: 'Tentar Novamente',
      message: 'Você deseja tentar essa missão novamente ou desfaze-la?',
      buttons: [
        {
          text: 'Desfazer',
          handler: () => {
            this.changeStatusQuest(3,obj,'Que Pena!',true);
          }
        },
        {
          text: 'Tentar Novamente',
          handler: () => {
            obj.titlePopOver = 'Que Pena!';
            obj.hideXp = true;
            const popover = this.popoverCtrl.create(PopOverInfoPage.name, obj);
            popover.present();
            this.viewCtrl.dismiss({reload: true, reloadUser: true});
          }
        }
      ]
    });
    confirm.present(); 
  }

  confirmManterFinalizar(obj){
    const confirm = this.alertCtrl.create({
      title: 'Finalizar ou Manter',
      message: 'Você deseja finalizar ou manter essa missão na lista de missões?',
      buttons: [
        {
          text: 'Manter',
          handler: () => {
            this.changeStatusQuest(1,obj,'Parabéns!',false);
          }
        },
        {
          text: 'Finalizar',
          handler: () => {
            this.changeStatusQuest(2,obj,'Parabéns!',false);
          }
        }
      ]
    });
    confirm.present(); 
  }

  changeStatusQuest(status,obj,title,hideXp){
    this.utils.loadingShow();
    firebase.database().ref(`quests/${btoa(this.param.id)}`).update({status: status}).then(() =>{

      obj.titlePopOver = title;
      obj.hideXp = hideXp;
      this.utils.loadingHide();
      const popover = this.popoverCtrl.create(PopOverInfoPage.name, obj);
      popover.present();
      this.viewCtrl.dismiss({reload: true, reloadUser: true});


    }).catch((error: Error) => {
      this.utils.loadingHide();
      this.utils.creatSimpleAlert('Erro na operação');
    })
  }

}
