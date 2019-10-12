import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import * as firebase from 'firebase';
import { Alimento } from '../../models/alimento';
import { QuestAlimentos } from '../../models/questAlimentos';
import { Quest } from '../../models/quest';
import { HomePage } from '../home/home';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';

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

  /*usuario logado*/
  usuario:any;

  /*formulario*/
  titulo:string = '';
  dias:any = [];
  periodo:string = '';
  evitar:boolean = false;

  /*objeto para gravar a quest*/
  quest:Quest;

  alert: Alert;

  data = new Date();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public alertController: AlertController,
    private utils: UtilsServiceProvider) {
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

  removeAlimento(alimento:QuestAlimentos){
    let posicao = this.questAlimentos.indexOf(alimento);
    this.questAlimentos.splice(posicao,1);
  }

  criarQuest(){

    if(this.titulo == '' || this.titulo == null || this.titulo == undefined){
      this.utils.creatToast('Informe o título para prosseguir!');
      return false;
    }else if(this.periodo == '' || this.periodo == null || this.periodo == undefined){
      this.utils.creatToast('Informe o período para prosseguir!');
      return false;
    }else if(this.dias == null || this.dias == undefined || this.dias.length == 0){
      this.utils.creatToast('Informe o(s) dia(s) para prosseguir!');
      return false;
    }else if(this.questAlimentos == null || this.questAlimentos == undefined || this.questAlimentos.length == 0){
      this.utils.creatToast('Informe o(s) alimento(s) para prosseguir!');
      return false;
    }else{

      let data = new Date();

      this.usuario = firebase.auth().currentUser;
      this.quest = new Quest();
      this.quest.alimentos = this.questAlimentos;
      this.quest.periodo = this.periodo;
      this.quest.evitar = this.evitar;
      this.quest.dias = this.dias;
      this.quest.usuario = btoa(this.usuario);
      this.quest.dataCriacao = (data.toISOString().substr(0, 10).split('-').reverse().join('/'));
      this.quest.id = btoa(data.getTime().toString());
     
      this.alert = this.alertController.create({
        subTitle:'',
        buttons: [
          { text: 'Ok',
            handler: () => {
              this.navCtrl.setRoot(HomePage.name);
            }
          }
        ]
      });
     
      this.utils.loadingShow();

      firebase.database().ref(`quests/${btoa(this.quest.id)}`).set(this.quest).then(() => {

        this.utils.loadingHide();

        this.alert.setSubTitle('Missão criada com sucesso!');
        this.alert.present();

      }).catch((error: Error) => {
        this.utils.loadingHide();
        this.alert.setSubTitle('Erro na operação!');
        this.alert.present();
      })

    }
    
  }

}
