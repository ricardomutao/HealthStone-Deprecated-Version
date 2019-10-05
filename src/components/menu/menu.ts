import { Component, Input } from '@angular/core';
import { NavController, LoadingController, Alert, AlertController } from 'ionic-angular';
import { LoginPage } from '../../pages/account/login/login';
import * as firebase from 'firebase';

/**
 * Generated class for the MenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  @Input() tileMenu: string = '';
  alert: Alert;

  constructor( 
    public navCtrl: NavController,
    private loadingController: LoadingController,
    public alertController: AlertController) {
  }

  logOut(){
    /*CRIACAO DO LOADING*/
    let loading = this.loadingController.create({
      content: 'Aguarde...'
    });
    
    loading.present();

    firebase.auth().signOut().then(() => {
      loading.dismiss();
      this.navCtrl.setRoot(LoginPage.name);

    }).catch((error:Error)=>{
      loading.dismiss();
      /*CRIACAO DO ALERTA*/
      this.alert = this.alertController.create({
        title:'',
        buttons: [
          { text: 'Ok'}
        ]
      });
      this.alert.setSubTitle('Erro na operação!');
      this.alert.present();
    });
  }

}
