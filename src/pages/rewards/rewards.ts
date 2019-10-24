import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';

/**
 * Generated class for the RewardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})
export class RewardsPage {
  check:boolean = false;
  item:any;

  listFiles:any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public utils: UtilsServiceProvider) {
  }

  ionViewDidLoad() {
    this.getFiles();
  }

  checkItem(item){
    this.item = item;
    this.check = true;
  }
  unCheckItem(item){
    this.item = item;
    this.check = false;
  }

  getFiles(){
    let that = this;
    this.listFiles = [];
    this.utils.loadingShow();
    var listRef = firebase.storage().ref().child('recompensas');

    listRef.listAll().then((res) => {

      res.items.forEach((itemRef) => {

        listRef.child(`${itemRef.name}`).getDownloadURL().then((res) => {
          that.listFiles.push(res);
        });

      });

      that.utils.loadingHide();

    }).catch(function(error) {
      that.utils.loadingHide();
      that.utils.creatSimpleAlert('Erro ao listar recompensas');
      console.log(error);
    });
  }

}
