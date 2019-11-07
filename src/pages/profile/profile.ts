import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';
import { CreateAvatarPage } from '../create-avatar/create-avatar';
import { AccountServiceProvider } from '../../providers/account-service/account-service';

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
 usuario:User;
 apiFailed = 1;

 
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    private utils: UtilsServiceProvider,
    public accountService: AccountServiceProvider) {
      this.usuario = this.navParams.get('user');


      //this.usuario.url = 'batata';
      let that = this;
      function fx(e) {
        that.apiFailed = 2;
        window.removeEventListener('error', fx, true);
      }
      window.addEventListener('error', fx, true);
  }

  
  ionViewWillEnter() {
    if(this.navCtrl.last().component.name == 'CreateAvatarPage'){
    //this.usuario.url = 'batata';
      this.findUserDatabase(); 
    }  
  }

  //Função para capturar usuário atual no database com base no Authentication
  findUserDatabase(){
    this.utils.loadingShow();
    this.accountService.getUser().then((user) => {
      this.usuario = user;
      this.utils.loadingHide();
    }).catch((error:Error) => {
      this.utils.loadingHide();
      this.utils.creatSimpleAlert('Erro ao carregar usuário!');
    });
  }

  //Função que redireciona para tela de criação de avatares
  goCreateAvatar(){
    this.navCtrl.push(CreateAvatarPage.name, {user: this.usuario});
  }

}
