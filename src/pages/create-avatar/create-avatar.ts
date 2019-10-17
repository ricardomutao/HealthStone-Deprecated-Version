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

  avatar = {
    hair: "ShortHairShortCurly",
    clothes: "ShirtCrewNeck",
  };

  url;

  constructor(public navCtrl: NavController, public navParams: NavParams,) {
  }


  ionViewDidLoad() {
    this.updateAvatar();
  }

  //Função provisória para carater de testes
  teste(){
    console.log(this.url);
    console.log(this.avatar)
  }

  //Função que atualiza o avatar em tempo real
  updateAvatar(){
    this.url = 'https://avataaars.io/?'
                  + '&topType='   	+ this.avatar.hair +
                  + '&clotheType='  + this.avatar.clothes 
                  
                  ;
  }


}
