import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, PopoverController } from 'ionic-angular';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';
import { RecompUser } from '../../models/recomp-user';
import { Quest } from '../../models/quest';
import { PopOverHomePage } from '../pop-over-home/pop-over-home';
import { RewardServiceProvider } from '../../providers/reward-service/reward-service';
import { QuestServiceProvider } from '../../providers/quest-service/quest-service';
import { AccountServiceProvider } from '../../providers/account-service/account-service';

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
    public popoverCtrl: PopoverController,
    public rewardService: RewardServiceProvider,
    public questService: QuestServiceProvider,
    public accountService: AccountServiceProvider) {
  }

  ionViewDidLoad() {
    this.utils.loadingShow();
    let connectionState = this.accountService.connectionState();
    if(connectionState){
      this.getReward();
      this.getQuests();
      this.utils.loadingHide();
    }else{
      this.utils.loadingHide();
      this.utils.creatToast('Verifique sua conexão com a internet para prosseguir!');
    }
  }

  async getReward(){
    this.listRewards = [];

    await this.rewardService.getRewards().then((rewards) => {
      this.listRewards = rewards;
    }).catch((error:Error) => {
      this.utils.creatSimpleAlert('Erro ao listar as recompensas!');
    });
  }

  async getQuests(){
    
    this.listQuestDone = [];
    this.listQuestUndone = [];
    this.listQuestDoneFinished = [];
    
    await this.questService.getQuest().then((quests) => {
      this.listQuestDone = quests.listQuestDone;
      this.listQuestUndone = quests.listQuestUndone;
      this.listQuestDoneFinished = quests.listQuestDoneFinished;
    }).catch((error:Error) => {
      this.utils.creatSimpleAlert('Erro ao listar as missões!');
    });
  }

  removeReward(reward:RecompUser){
    this.utils.loadingShow();

    this.rewardService.removeReward(reward).then(() => {
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
