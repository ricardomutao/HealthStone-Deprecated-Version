import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { Alimento } from '../../models/alimento';

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
  questAlimentoa: Alimento[];

  ionViewDidLoad() {

    let alimento: Alimento;
    //Pegando todos alimentos do banco de dados alimentado
    firebase.database().ref(`alimentos`).once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        alimento = childSnapshot.val();
        this.alimentos.push(alimento);
      });

    });
    
  }

}
