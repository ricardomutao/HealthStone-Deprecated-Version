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
  usuario: User = {email:'', nomeCompleto:'', userNme:'', url:''};
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    private utils: UtilsServiceProvider) {
  }

  ionViewDidLoad() {
    this.utils.loadingShow();
    this.findUserDatabase();
    this.utils.loadingHide();
    //this.usuario = this.findUserDatabase(userAuth);
    
  }

  //Função para capturar usuário atual no database com base no Authentication
  findUserDatabase(){
    let authUser = firebase.auth().currentUser;
    firebase.database().ref(`usuarios`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        if(childSnapshot.val().email == authUser.email){
          this.usuario = childSnapshot.val();
          return true;
        }
      });
    });
    return false;
  }

  //Função para fechar a tela atual
  dismiss(){
    this.navCtrl.pop();
  }

  //Função que redireciona para tela de criação de avatares
  goCreateAvatar(){
    console.log(this.usuario);
    this.navCtrl.push(CreateAvatarPage.name, {user: this.usuario});
  }

}
