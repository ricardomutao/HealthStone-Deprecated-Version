import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, MenuController, Alert, AlertController } from 'ionic-angular';
import { CreateQuestPage } from '../create-quest/create-quest';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';
import { PopOverHomePage } from '../pop-over-home/pop-over-home';
import { Quest } from '../../models/quest';
import { User } from '../../models/user';
import { AccountServiceProvider } from '../../providers/account-service/account-service';
import { QuestServiceProvider } from '../../providers/quest-service/quest-service';
import firebase from 'firebase';
import { LoginPage } from '../account/login/login';
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

  listSlides = [];

  user:User;

  alert: Alert;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public utils: UtilsServiceProvider,
    public popoverCtrl: PopoverController,
    public accountService: AccountServiceProvider,
    public questService: QuestServiceProvider,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController) {
    
  }

  ionViewWillEnter() {  
    this.menuCtrl.enable(true);
    this.getUser();
    this.getQuest();
  }

  goCreateQuest(){
    this.navCtrl.push(CreateQuestPage.name);
  }

  getQuest(){
    this.utils.loadingShow();
    
    this.listQuestManha = [];
    this.listQuestTarde = [];
    this.listQuestNoite = [];
    this.listSlides = [];
    
    this.questService.getQuest().then((quests) => {
      this.listQuestManha = quests.listManha;
      this.listQuestTarde = quests.listTarde;
      this.listQuestNoite = quests.listNoite;

      if(this.listQuestManha && this.listQuestManha.length > 0){
        this.listSlides.push({title: 'Manhã', list: this.listQuestManha});
      }
      if(this.listQuestTarde && this.listQuestTarde.length > 0){
        this.listSlides.push({title: 'Tarde', list: this.listQuestTarde});
      }
      if(this.listQuestNoite && this.listQuestNoite.length > 0){
        this.listSlides.push({title: 'Noite', list: this.listQuestNoite});
      }

      this.utils.loadingHide();
    }).catch((error:Error) => {
      this.utils.loadingHide();
      this.utils.creatSimpleAlert('Erro na operação!');
    });

  }

  presentPopover(quest:Quest,myEvent:any) {
    const popover = this.popoverCtrl.create(PopOverHomePage.name, {questSelected: quest, pageControl: false, remButton: false, user: this.user});
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((retorno) => {
      if(retorno != null && retorno.reload){
        this.getQuest();
      }
      if(retorno != null && retorno.reloadUser){
        this.getUser();
      }
    });
  }

  getUser(){
    if(!(firebase.auth().currentUser)){
      const confirm = this.alertCtrl.create({
        title: 'Ops!',
        message: 'Você foi deslogado! Por favor realize o login novamente.',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.navCtrl.setRoot(LoginPage.name);
            }
          }
        ]
      });
      confirm.present();
    }else{
      this.accountService.getUser().then((user) => {
        this.user = user;
      }).catch((error:Error) => {
        this.utils.creatSimpleAlert('Erro ao carregar usuário!');
      });
    } 
  }

}
