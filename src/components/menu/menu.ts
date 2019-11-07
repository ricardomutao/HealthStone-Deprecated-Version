import { Component, Input} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/account/login/login';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';
import { ProfilePage } from '../../pages/profile/profile';
import { RewardsPage } from '../../pages/rewards/rewards';
import { InventoryPage } from '../../pages/inventory/inventory';

import { User } from '../../models/user';
import { GuidePage } from '../../pages/guide/guide';
import { AccountServiceProvider } from '../../providers/account-service/account-service';

/**
 * Generated class for the MenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu',
  templateUrl: 'menu.html',
  styles: ['menu.scss'],
})
export class MenuComponent {

  @Input() user:User;
  

  color_hp = 'primary';
  mode_hp = 'determinate';
  
  color_xp = 'primary';
  mode_xp = 'determinate';


  apiFailed = 1;

  constructor( 
    public navCtrl: NavController,
    public utils: UtilsServiceProvider,
    public navParams: NavParams,
    public accountService: AccountServiceProvider) {
      
      let that = this;
      function fx(e) {
        that.apiFailed = 2;
        window.removeEventListener('error', fx, true);
      }
      window.addEventListener('error', fx, true);
  }

  logOut(){
    
    this.utils.loadingShow();

    this.accountService.signOut().then(() => {
      
      this.utils.loadingHide();
      this.navCtrl.setRoot(LoginPage.name);

    }).catch((error:Error)=>{
      this.utils.loadingHide();
      this.utils.creatSimpleAlert('Erro na operação!');
    });
  }

  goProfile(){
    if(this.navCtrl.getActive().id != 'ProfilePage'){
      this.navCtrl.push(ProfilePage.name,{user: this.user});
    }
  }

  goRewards(){
    if(this.navCtrl.getActive().id != 'RewardsPage'){
      this.navCtrl.push(RewardsPage.name,{user: this.user});
    }
  }

  goInventory(){
    if(this.navCtrl.getActive().id != 'InventoryPage'){
      this.navCtrl.push(InventoryPage.name);
    }
  }

  goGuide(){
    if(this.navCtrl.getActive().id != 'GuidePage'){
      this.navCtrl.push(GuidePage.name);
    }
  }

}
