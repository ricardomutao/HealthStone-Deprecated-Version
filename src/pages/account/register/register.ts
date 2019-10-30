import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { User } from '../../../models/user';
import * as firebase from 'firebase';
import { UtilsServiceProvider } from '../../../providers/utils/utils-service';


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
    public alertController: AlertController,
    public utils: UtilsServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  goLogin(){
    this.navCtrl.setRoot(LoginPage.name);
  }

  register(){
    /*VALIDACAO DO FORMULARIO*/
    if(this.nome == '' || this.nome == null || this.nome == undefined){
      this.utils.creatToast('Campo "Nome Completo" é obrigatório!');
      return false;
    }else if(this.username == '' || this.username == null || this.username == undefined){
      this.utils.creatToast('Campo "Username" é obrigatório!');
      return false;
    }else if(this.email == '' || this.email == null || this.email == undefined){
      this.utils.creatToast('Campo "E-mail" é obrigatório!');
      return false;
    }else if(this.senha == '' || this.senha == null || this.senha == undefined){
      this.utils.creatToast('Campo "Senha" é obrigatório!');
      return false;
    }else if(this.senhaConfirm == '' || this.senhaConfirm == null || this.senhaConfirm == undefined){
      this.utils.creatToast('Campo "Confirmar Senha" é obrigatório!');
      return false;
    }else if(!(this.senhaConfirm === this.senha)){
      this.utils.creatToast('Os campos de senha devem ser iguais!');
      return false;
    }else if(this.senha.length < 6){
      this.utils.creatToast('A senha deve ter no mínimo 6 caracteres!');
    }else{
      this.user = new User();
      this.user.nomeCompleto = this.nome;
      this.user.userNme = this.username;
      this.user.email = this.email.trim().toLowerCase();
      this.user.hp = 100;
      this.user.level = 1;
      this.user.xp = 0;
      this.user.ticket = 0;
      this.user.url = "https://avataaars.io/?&topType=ShortHairShortCurly&clotheType=ShirtCrewNeck&facialHairType=Blank&accessoriesType=Blank&hairColor=Black&hatColor=Black&clotheColor=Black&graphicType=Bat&facialHairColor=Black&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light&";

      /*CRIACAO DO ALERTA*/
      this.alert = this.alertController.create({
        title:'',
        buttons: [
          { text: 'Ok',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });

      this.utils.loadingShow();
      
      firebase.auth().createUserWithEmailAndPassword(this.user.email, this.senha)
      .then(() => {
        //registrando dados complementares do usuario no path email na base64
        //Para desconverter usar atob()
        firebase.database().ref(`usuarios/${btoa(this.user.email)}`).set(this.user);

        this.utils.loadingHide();

        this.alert.setSubTitle('Registrado com sucesso!');
        this.alert.present();

      }).catch((error:Error) => {
        this.utils.loadingHide();
        this.alert.setSubTitle('Erro na operação!');
        this.alert.present();
      })

    }
  }

}
