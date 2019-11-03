import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../../home/home';
import { UtilsServiceProvider } from '../../../providers/utils/utils-service';
import { AccountServiceProvider } from '../../../providers/account-service/account-service';

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
    public utils: UtilsServiceProvider,
    public accountService: AccountServiceProvider) {
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

      this.accountService.logIn(this.email,this.senha).then(() => {
        this.utils.loadingHide();
        this.navCtrl.setRoot(HomePage.name);
        
      }).catch((error:Error) => {
        this.utils.loadingHide();
        this.utils.creatSimpleAlert('Erro na operação!');
      })

    }
  }

}
