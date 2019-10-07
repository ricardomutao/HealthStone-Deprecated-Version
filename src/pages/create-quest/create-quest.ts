import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { Alimento } from '../../models/alimento';
import { QuestAlimentos } from '../../models/questAlimentos';

/**
 * Generated class for the CreateQuestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-quest',
  templateUrl: 'create-quest.html',
})
export class CreateQuestPage{

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  alimentos: Alimento[] = [];
  filterAlimentos: Alimento [];
  questAlimentos: QuestAlimentos[] = [];
  tab:string = 'alimentos';

  ionViewDidLoad() {
    this.initializeItems();
  }

  getItems(ev: any) {

    // set val to the value of the searchbar
    const val = ev.target.value;
    this.filterAlimentos = new Array();

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      for (var i = 0; i < this.alimentos.length; i++) {
        if (this.alimentos[i].descricao.toLowerCase().indexOf(val.toLowerCase()) != -1)  this.filterAlimentos.push(this.alimentos[i]);
      }
    }else{
      this.filterAlimentos = this.alimentos;
    }
  }

  initializeItems(){
    let alimento: Alimento;
    //Pegando todos alimentos do banco de dados alimentado
    firebase.database().ref(`alimentos`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        alimento = childSnapshot.val();
        this.alimentos.push(alimento);
      });
      this.filterAlimentos = this.alimentos;
    });
  }

}
