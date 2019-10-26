import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, MenuController } from 'ionic-angular';
import { CreateQuestPage } from '../create-quest/create-quest';
import * as firebase from 'firebase';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';
import { PopOverHomePage } from '../pop-over-home/pop-over-home';
import { Quest } from '../../models/quest';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  listQuestManha:Quest[] = [];

  listQuestTarde:Quest[] = [];

  listQuestNoite:Quest[] = [];

  authUser:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public utils: UtilsServiceProvider,
    public popoverCtrl: PopoverController,
    public menuCtrl: MenuController) {

    this.authUser = firebase.auth().currentUser;
  }

  ionViewWillEnter() {
    this.getQuest();
    this.menuCtrl.close();
  }

  goCreateQuest(){
    this.navCtrl.push(CreateQuestPage.name);
  }

  getQuest(){
    this.utils.loadingShow();
    
    this.listQuestManha = [];
    this.listQuestTarde = [];
    this.listQuestNoite = [];
    
    firebase.database().ref(`quests`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        if(childSnapshot.val().usuario == btoa(this.authUser.email)){
          if((childSnapshot.val().periodo.toLowerCase() == 'manha') && (childSnapshot.val().status == 0 || childSnapshot.val().status == 1)){
            this.listQuestManha.push(childSnapshot.val());
          }else if((childSnapshot.val().periodo.toLowerCase() == 'tarde') && (childSnapshot.val().status == 0 || childSnapshot.val().status == 1)){
            this.listQuestTarde.push(childSnapshot.val());
          }else if((childSnapshot.val().periodo.toLowerCase() == 'noite') && (childSnapshot.val().status == 0 || childSnapshot.val().status == 1)){
            this.listQuestNoite.push(childSnapshot.val());
          }
        }
      });
      this.utils.loadingHide();
    });

  }

  presentPopover(quest:Quest,myEvent:any) {
    const popover = this.popoverCtrl.create(PopOverHomePage.name, {questSelected: quest});
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((retorno) => {
      if(retorno != null && retorno.excluido){
        this.getQuest();
      }
    });
  }

}
