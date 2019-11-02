import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, PopoverController } from 'ionic-angular';
import firebase from 'firebase';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';
import { RecompUser } from '../../models/recomp-user';
import { Quest } from '../../models/quest';
import { PopOverHomePage } from '../pop-over-home/pop-over-home';

/**
 * Generated class for the InventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {
  tab:string = 'recompensas';
  @ViewChild(Slides) slides: Slides;

  listQuestDone = [];
  listQuestDoneFinished = [];
  listQuestUndone = [];
  listRewards = [];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public utils: UtilsServiceProvider,
    public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    this.utils.loadingShow();
    this.getReward();
    this.getQuests();
    this.utils.loadingHide();
  }

  async getReward(){
    let authUser = firebase.auth().currentUser;
    this.listRewards = [];

    await firebase.database().ref(`recomp-user`).once('value', async (snapshot: any) => {
     await snapshot.forEach((childSnapshot: any) => {
        if(childSnapshot.val().user == btoa(authUser.email)){
          this.listRewards.push(childSnapshot.val());
        }
      });
    }).catch((error:Error) => {
      this.utils.creatSimpleAlert('Erro na operação!');
    });;
  }

  async getQuests(){
    let authUser = firebase.auth().currentUser;
    
    this.listQuestDone = [];
    this.listQuestUndone = [];
    this.listQuestDoneFinished = [];
    
    await firebase.database().ref(`quests`).once('value', async (snapshot: any) => {
      await snapshot.forEach((childSnapshot: any) => {
        if(childSnapshot.val().usuario == btoa(authUser.email)){
          if(childSnapshot.val().status == 1){
            this.listQuestDone.push(childSnapshot.val());
          }else if(childSnapshot.val().status == 2){
            this.listQuestDoneFinished.push(childSnapshot.val());
          }else if(childSnapshot.val().status == 3){
            this.listQuestUndone.push(childSnapshot.val());
          }
        }
      });
    }).catch((error:Error) => {
      this.utils.creatSimpleAlert('Erro na operação!');
    });;
  }

  removeReward(reward:RecompUser){
    this.utils.loadingShow();

    firebase.database().ref(`recomp-user/${btoa(reward.id)}/`).remove().then(() => {
      this.utils.loadingHide();
      this.utils.creatSimpleAlert('Recompensa removida com sucesso');
      this.getReward();
      
    }).catch((error: Error) => {
      this.utils.loadingHide();
      this.utils.creatSimpleAlert('Erro ao excluir recompensa');
    });

  }

  presentPopover(quest:Quest,myEvent:any, remButtonShow:any) {
    const popover = this.popoverCtrl.create(PopOverHomePage.name, {questSelected: quest, pageControl: true, remButton: remButtonShow, user:null});
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((retorno) => {
      if(retorno != null && retorno.reload){
        this.getQuests();
      }
      
    });
  }



}
