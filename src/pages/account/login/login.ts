import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Alert } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../../home/home';
import * as firebase from 'firebase';

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

  alert: Alert;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController, 
    public alertController: AlertController,
    private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goRegister(){
    this.navCtrl.push(RegisterPage.name);
  }

  login(){
    /*CRIACAO DO TOAST DE ERRO*/
    let toast = this.toastCtrl.create({
      message: '',
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Fechar',
      cssClass: 'changeToast'

    });
    /*VALIDACAO DO FORMULARIO*/
    if(this.email == '' || this.email == null || this.email == undefined){
      toast.setMessage('Informe o e-mail para prosseguir!');
      toast.present();
      return false;
    }else if(this.senha == '' || this.senha == null || this.senha == undefined){
      toast.setMessage('Informe a senha para prosseguir!');
      toast.present();
      return false;
    }else{
      /*CRIACAO DO ALERTA*/
      this.alert = this.alertController.create({
        title:'',
        buttons: [
          { text: 'Ok'}
        ]
      });
      /*CRIACAO DO LOADING*/
      let loading = this.loadingController.create({
        content: 'Aguarde...'
      });
      
      loading.present();

      firebase.auth().signInWithEmailAndPassword((this.email.trim()), this.senha).then(() => {
        loading.dismiss();
        this.navCtrl.setRoot(HomePage.name);

      }).catch((error:Error) => {
        loading.dismiss();
        this.alert.setSubTitle('Erro na operação!');
        this.alert.present();
      })

    }
  }

}
