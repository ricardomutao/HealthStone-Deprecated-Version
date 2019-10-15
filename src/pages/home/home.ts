import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateQuestPage } from '../create-quest/create-quest';
import * as firebase from 'firebase';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';
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

  tileMenu: string = 'Missões';

  listQuestManha = [];
  checkMaxQtdManha:boolean = false;

  listQuestTarde = [];
  checkMaxQtdTarde:boolean = false;

  listQuestNoite = [];
  checkMaxQtdNoite:boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public utils: UtilsServiceProvider) {
  }

  ionViewDidLoad() {
    this.getQuest();
  }

  goCreateQuest(){
    this.navCtrl.push(CreateQuestPage.name);
  }

  getQuest(){
    this.utils.loadingShow();
    let authUser = firebase.auth().currentUser;
    firebase.database().ref(`quests`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        if(childSnapshot.val().usuario == btoa(authUser.email)){
          if(childSnapshot.val().periodo.toLowerCase() == 'manha'){
            this.listQuestManha.push(childSnapshot.val());
          }else if(childSnapshot.val().periodo.toLowerCase() == 'tarde'){
            this.listQuestTarde.push(childSnapshot.val());
          }else{
            this.listQuestNoite.push(childSnapshot.val());
          }
        }
      });
      this.utils.loadingHide();
    });

  }

}
