import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';
import { User } from '../../models/user';
import { RecompUser } from '../../models/recomp-user';
import { Reward } from '../../models/reward';
import { RewardServiceProvider } from '../../providers/reward-service/reward-service';
import { AccountServiceProvider } from '../../providers/account-service/account-service';

/**
 * Generated class for the RewardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})
export class RewardsPage {

  user:User;
  recompUser:RecompUser;

  date:string = new Date().toISOString();

  check:boolean = false;
  item:Reward;

  listFiles:any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public utils: UtilsServiceProvider,
    public alertCtrl: AlertController,
    public rewardService: RewardServiceProvider,
    public accountService: AccountServiceProvider) {
      this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
    this.getFiles();
  }

  checkItem(item,flag){
    this.item = item;
    this.check = flag;
  }

  getFiles(){
    this.utils.loadingShow();

    this.rewardService.getFiles().then((files)=> {

      this.listFiles = files;
      this.utils.loadingHide();
              
    }).catch(function(error) {
        this.utils.loadingHide();
        this.utils.creatSimpleAlert('Erro ao listar recompensas');
    });

  }

  async getUser(){
    await this.accountService.getUser().then((user) => {
      this.user = user;
    }).catch((error:Error) => {
      this.utils.creatSimpleAlert('Erro ao carregar usuário!');
    });
  }

  confirmSaveReward(){
    if(!this.check){
      this.utils.creatToast('Você deve selecionar pelo menos uma recompensa');
      return false;
    }
    if(this.item.value > this.user.ticket){
      this.utils.creatToast('Você não possui fichas de recompensa suficientes');
      return false;
    }

    const confirm = this.alertCtrl.create({
      title: 'Confirmar Recompensa',
      message: 'Tem certeza que é essa recompensa que deseja?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.saveReward();
          }
        }
      ]
    });
    confirm.present();

  }

  saveReward(){
    let data = new Date();

    this.recompUser = new RecompUser();
    this.recompUser.user = btoa(this.user.email);
    this.recompUser.recompensa = this.item;
    this.recompUser.dataAgendada = (this.date.substr(0, 10).split('-').reverse().join('/'));
    this.recompUser.dataRecompensa = (data.toISOString().substr(0, 10).split('-').reverse().join('/'));
    this.recompUser.id = data.getTime().toString();

    this.utils.loadingShow();

    this.rewardService.saveReward(this.recompUser).then(() => {
      this.check = false;

      this.accountService.updateUser(this.user,{ticket: (this.user.ticket - this.item.value)}).then(() =>{
        this.getUser();
        this.utils.loadingHide();
        this.utils.creatSimpleAlert('Recompensa adquirida com sucesso');
      })

    }).catch((error: Error) => {
      this.utils.loadingHide();
      this.utils.creatSimpleAlert('Erro na operação');
    })
  }

}
