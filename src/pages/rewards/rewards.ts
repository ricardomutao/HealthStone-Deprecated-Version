import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';
import { User } from '../../models/user';
import { RecompUser } from '../../models/recomp-user';
import { Reward } from '../../models/reward';

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

  user:User = {email:'', nomeCompleto:'', userNme:'', url:'', hp: 0, level: 0, ticket: 0, xp: 0};
  recompUser:RecompUser;

  date:string = new Date().toISOString();

  check:boolean = false;
  item:Reward;

  listFiles:any = [];

  maxSlides:number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public utils: UtilsServiceProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.getUser();
    this.getFiles();
  }

  checkItem(item,flag){
    this.item = item;
    this.check = flag;
  }

  getFiles(){
    let that = this;
    let auxList = [];
    that.listFiles = [];
    this.utils.loadingShow();

    firebase.database().ref(`recompensas`).once('value', (snapshot: any) => {

      snapshot.forEach( (childSnapshot: any) => {
        auxList.push(childSnapshot.val());
      });

       if(auxList != null && auxList.length <= 6){
        that.listFiles.push(auxList);
       }else{
        var contador = 6;
        let auxListFiles = [];
        for(let i = 0; i < auxList.length; i++){
          auxListFiles.push(auxList[i]);
          if(i >= (contador-1) || ((i+1) == auxList.length)){
            that.listFiles.push(auxListFiles);
            contador = contador + 6;
            auxListFiles = [];
          }
        }
       }

       this.utils.loadingHide();

              
     }).catch(function(error) {
        that.utils.loadingHide();
        that.utils.creatSimpleAlert('Erro ao listar recompensas');
        console.log(error);
      });

  }

  async getUser(){
    let authUser = firebase.auth().currentUser;
    await firebase.database().ref(`usuarios`).once('value', async (snapshot: any) => {
     await snapshot.forEach((childSnapshot: any) => {
        if(childSnapshot.val().email == authUser.email){
          this.user = childSnapshot.val();
          return true;
        }
      });
    }).catch((error:Error) => {
      this.utils.creatSimpleAlert('Erro na operação!');
    });;
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

    firebase.database().ref(`recomp-user/${btoa(this.recompUser.id)}`).set(this.recompUser).then(() => {
      this.check = false;

      firebase.database().ref(`usuarios/${btoa(this.user.email)}`).update({ticket: (this.user.ticket - this.item.value)}).then(() =>{

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
