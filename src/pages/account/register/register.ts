import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Alert, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { User } from '../../../models/user';
import * as firebase from 'firebase';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  /*OBJETO DO CADASTRO DO USUARIO*/
  user: User;
 
  /*VARIAVEIS DO FORMULARIO*/
  nome:string = '';
  username:string = '';
  email:string = '';
  senha:string = '';
  senhaConfirm:string = '';

  alert: Alert;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private toastCtrl: ToastController, 
    public alertController: AlertController,
    private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goLogin(){
    this.navCtrl.setRoot(LoginPage.name);
  }

  register(){
    /*CRIACAO DO TOAST DE ERRO*/
    let toast = this.toastCtrl.create({
      message: '',
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Fechar',
      cssClass: 'changeToast'

    });

    /*VALIDACAO DO FORMULARIO*/
    if(this.nome == '' || this.nome == null || this.nome == undefined){
      toast.setMessage('Campo "Nome Completo" é obrigatório!');
      toast.present();
      return false;
    }else if(this.username == '' || this.username == null || this.username == undefined){
      toast.setMessage('Campo "Username" é obrigatório!');
      toast.present();
      return false;
    }else if(this.email == '' || this.email == null || this.email == undefined){
      toast.setMessage('Campo "E-mail" é obrigatório!');
      toast.present();
      return false;
    }else if(this.senha == '' || this.senha == null || this.senha == undefined){
      toast.setMessage('Campo "Senha" é obrigatório!');
      toast.present();
      return false;
    }else if(this.senhaConfirm == '' || this.senhaConfirm == null || this.senhaConfirm == undefined){
      toast.setMessage('Campo "Confirmar Senha" é obrigatório!');
      toast.present();
      return false;
    }else if(!(this.senhaConfirm === this.senha)){
      toast.setMessage('Os campos de senha devem ser iguais!');
      toast.present();
      return false;
    }else if(this.senha.length < 6){
      toast.setMessage('A senha deve ter no mínimo 6 caracteres!');
      toast.present();
    }else{
      this.user = new User();
      this.user.nomeCompleto = this.nome;
      this.user.userNme = this.username;
      this.user.email = this.email.trim();
      this.user.password = this.senha;

      /*CRIACAO DO ALERTA*/
      this.alert = this.alertController.create({
        title:'',
        buttons: [
          { text: 'Ok',
            handler: () => {
              this.navCtrl.setRoot(LoginPage.name);
            }
          }
        ]
      });

      /*CRIACAO DO LOADING*/
      let loading = this.loadingController.create({
        content: 'Aguarde...'
      });
      
      loading.present();

      firebase.auth().createUserWithEmailAndPassword(this.user.email = this.email,this.user.password)
      .then(() => {
        //remover o atributo senha do objeto usuario
        delete this.user.password;
        //registrando dados complementares do usuario no path email na base64
        //Para desconverter usar atob()
        firebase.database().ref(`usuarios/${btoa(this.user.email)}`).set(this.user);

        loading.dismiss();

        this.alert.setSubTitle('Registrado com sucesso!');
        this.alert.present();

      }).catch((error:Error) => {
        loading.dismiss();
        this.alert.setSubTitle('Erro na operação!');
        this.alert.present();
      })

    }
  }

}
