import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PopOverInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pop-over-info',
  templateUrl: 'pop-over-info.html',
})
export class PopOverInfoPage {

  title:any;
  hideXp:boolean = false;

  color_hp = 'primary';
  mode_hp = 'determinate';
  
  color_xp = 'primary';
  mode_xp = 'determinate';

  ticket:any;
  xp:any = 0;
  level:any;
  hpMax:any;
  xpMax:any;
  hp:any = 0;
  flagMorto:any = false;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.title = this.navParams.get('titlePopOver');
    this.hideXp = this.navParams.get('hideXp');
    this.flagMorto = this.navParams.get('flagMorto');
  }

  ionViewDidEnter() {
    let that = this;

    setTimeout(() => {
      that.ticket = that.navParams.get('ticket');
      that.xp = that.navParams.get('xp');
      that.level = that.navParams.get('level');
      that.hpMax = that.navParams.get('hpMax');
      that.xpMax = that.navParams.get('xpMax');
      that.hp = that.navParams.get('hp');
    }, 500);
  }

}
