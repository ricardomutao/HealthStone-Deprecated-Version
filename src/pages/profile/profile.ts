import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { User } from '../../models/user';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';
import { CreateAvatarPage } from '../create-avatar/create-avatar';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage{
 usuario: User = {email:'', nomeCompleto:'', userNme:'', url:'', hp: 0, level: 0, ticket: 0, xp: 0};
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    private utils: UtilsServiceProvider) {
  }

  ionViewWillEnter() {
    this.findUserDatabase(); 
    //this.usuario = this.findUserDatabase(userAuth);
  }

  //Função para capturar usuário atual no database com base no Authentication
  findUserDatabase(){
    this.utils.loadingShow();
    let authUser = firebase.auth().currentUser;
    firebase.database().ref(`usuarios`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        if(childSnapshot.val().email == authUser.email){
          this.usuario = {email:'', nomeCompleto:'', userNme:'', url:'', hp: 0, level: 0, ticket: 0, xp: 0};
          this.usuario = childSnapshot.val();
          console.log("Recebe do banco: ", this.usuario);
          this.utils.loadingHide();
          return true;
        }
      });
    }).catch((error:Error) => {
      this.utils.loadingHide();
      this.utils.creatSimpleAlert('Erro na operação!');
    });
    return false;
  }

  //Função para fechar a tela atual
  dismiss(){
    this.navCtrl.pop();
  }

  //Função que redireciona para tela de criação de avatares
  goCreateAvatar(){
    console.log("Ta mandando pro outro lado: ", this.usuario);
    this.navCtrl.push(CreateAvatarPage.name, {user: this.usuario});
  }

}
