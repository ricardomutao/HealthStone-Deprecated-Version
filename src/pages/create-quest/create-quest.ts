import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  alimentos: Alimento[] = [];
  filterAlimentos: Alimento [];
  questAlimentos: QuestAlimentos[] = [];
  tab:string = 'alimentos';

  usuario:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.initializeItems();
  }

  getItems(ev: any) {

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterAlimentos = this.filterAlimentos.filter((item) => {
        return (item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
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

  setQtd(alimento:Alimento){
   
    const prompt = this.alertCtrl.create({
      title: 'Quantidade',
      message: 'Coloque a quantidade do alimento selecionado. Unidade('+alimento.unidade+')',
      inputs: [
        {
          name: 'qtd',
          placeholder: 'Qtd.'
        },
      ],
      buttons: [
        {
          text: 'Cancelar'   
        },
        {
          text: 'Salvar',
          handler: data => {
            if(data.qtd){
              let objAlimento = {
                qtd: data.qtd,
                alimento: alimento
              }
              this.questAlimentos.push(objAlimento);
            }
  
          }
        }
      ]
    });
    prompt.present();
    
  }

  getUser(){
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        return btoa(user.email);
      }else{
        return false;
      }
    })
  }

}
