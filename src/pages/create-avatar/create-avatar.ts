import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CreateAvatarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-avatar',
  templateUrl: 'create-avatar.html',
})
export class CreateAvatarPage {

  avatar = {hair: "ShortHairShortCurly"};

  avatarSelecionado;

  url;

  constructor(public navCtrl: NavController, public navParams: NavParams,) {
  }

  


  ionViewDidLoad() {
    this.avatarSelecionado = "topType="+this.avatar.hair;
    this.url = `https://avataaars.io/?${this.avatarSelecionado}`
  }

  teste(){
    console.log(this.url);
    console.log(this.avatar)
  }

  updateAvatar(){
    this.avatarSelecionado = "topType="+this.avatar.hair;
    this.url = `https://avataaars.io/?${this.avatarSelecionado}`
  }


}
