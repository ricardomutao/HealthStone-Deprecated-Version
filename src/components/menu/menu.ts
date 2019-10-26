import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/account/login/login';
import * as firebase from 'firebase';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';
import { ProfilePage } from '../../pages/profile/profile';
import { RewardsPage } from '../../pages/rewards/rewards';
import { InventoryPage } from '../../pages/inventory/inventory';

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

  constructor( 
    public navCtrl: NavController,
    public utils: UtilsServiceProvider) {
  }

  logOut(){
    
    this.utils.loadingShow();

    firebase.auth().signOut().then(() => {
      
      this.utils.loadingHide();
      this.navCtrl.setRoot(LoginPage.name);

    }).catch((error:Error)=>{
      this.utils.loadingHide();
      this.utils.creatSimpleAlert('Erro na operação!');
    });
  }

  goProfile(){
    this.navCtrl.push(ProfilePage.name);
  }

  goRewards(){
    if(this.navCtrl.getActive().id != 'RewardsPage'){
      this.navCtrl.push(RewardsPage.name);
    }
  }

  goInventory(){
    if(this.navCtrl.getActive().id != 'InventoryPage'){
      this.navCtrl.push(InventoryPage.name);
    }
  }


}
