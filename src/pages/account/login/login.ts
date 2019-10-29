import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../../home/home';
import * as firebase from 'firebase';
import { UtilsServiceProvider } from '../../../providers/utils/utils-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  /*VARIAVEIS DO FORMULARIO*/
  email:string = '';
  senha:string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public utils: UtilsServiceProvider) {
  }

  ionViewDidLoad() {
  }

  goRegister(){
    this.navCtrl.push(RegisterPage.name);
  }

  login(){
    /*VALIDACAO DO FORMULARIO*/
    if(this.email == '' || this.email == null || this.email == undefined){
      this.utils.creatToast('Informe o e-mail para prosseguir!');
      return false;
    }else if(this.senha == '' || this.senha == null || this.senha == undefined){
      this.utils.creatToast('Informe a senha para prosseguir!');
      return false;
    }else{
      
      this.utils.loadingShow();

      firebase.auth().signInWithEmailAndPassword((this.email.trim()), this.senha).then(() => {
        let authUser = firebase.auth().currentUser;
        firebase.database().ref(`usuarios`).once('value', (snapshot: any) => {
          snapshot.forEach((childSnapshot: any) => {
            if(childSnapshot.val().email == authUser.email){
              this.utils.loadingHide();
              this.navCtrl.setRoot(HomePage.name, {user: childSnapshot.val(), login: true});
            }
          });
        });
        

      }).catch((error:Error) => {
        this.utils.loadingHide();
        this.utils.creatSimpleAlert('Erro na operação!');
      })

    }
  }

}
