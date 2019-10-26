import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';
import { User } from '../../models/user';
import { RecompUser } from '../../models/recomp-user';

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

  user:User = {email:'', nomeCompleto:'', userNme:'', url:'', hp: 0, level: 0, ticket: 0};
  recompUser:RecompUser;

  check:boolean = false;
  item:any;

  listFiles:any = [];

  maxSlides:number = 0;
  arrAux = [];

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

  async getFiles(){
    let that = this;
    that.listFiles = [];
    this.utils.loadingShow();
    var listRef = firebase.storage().ref().child('recompensas');

     await listRef.listAll().then( async (res) => {

      var contador = 6;
    
      var arrAux = [];
      var resAux = res;

      for(let i = 0; i < resAux.items.length; i++){

        await listRef.child(`${resAux.items[i].name}`).getDownloadURL().then((res) => {
          arrAux.push(res);
        });

        if(i >= (contador-1) || ((i+1) == resAux.items.length)){
          that.listFiles.push(arrAux);
          contador = contador + 6;
          arrAux = [];
        }

      }

      that.utils.loadingHide();

    }).catch(function(error) {
      that.utils.loadingHide();
      that.utils.creatSimpleAlert('Erro ao listar recompensas');
      console.log(error);
    });

  }

  getUser(){
    let authUser = firebase.auth().currentUser;
    firebase.database().ref(`usuarios`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        if(childSnapshot.val().email == authUser.email){
          this.user = childSnapshot.val();
          return true;
        }
      });
    });
  }

  confirmSaveReward(){
    if(!this.check){
      this.utils.creatToast('Você deve selecionar pelo menos uma recompensa');
      return false;
    }
    if(this.user.ticket == 0){
      this.utils.creatToast('Você não possui nenhuma ficha de recompensa');
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
    this.recompUser.user = this.user.email;
    this.recompUser.recompensa = this.item;
    this.recompUser.id = data.getTime().toString();

    this.utils.loadingShow();

    firebase.database().ref(`recomp-user/${btoa(this.recompUser.id)}`).set(this.recompUser).then(() => {
      this.check = false;
      this.utils.loadingHide();
      this.utils.creatSimpleAlert('Recompensa adquirida com sucesso');

    }).catch((error: Error) => {
      this.utils.loadingHide();
      this.utils.creatSimpleAlert('Erro na operação');
    })
  }

}
