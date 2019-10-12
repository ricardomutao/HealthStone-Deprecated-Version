import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Alert, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Alimento } from '../../models/alimento';
import { QuestAlimentos } from '../../models/questAlimentos';
import { Quest } from '../../models/quest';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public alertController: AlertController,
    private loadingController: LoadingController) {
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
    let toast = this.toastCtrl.create({
      message: '',
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Fechar',
      cssClass: 'changeToast'

    });

    if(this.titulo == '' || this.titulo == null || this.titulo == undefined){
      toast.setMessage('Informe o título para prosseguir!');
      toast.present();
      return false;
    }else if(this.periodo == '' || this.periodo == null || this.periodo == undefined){
      toast.setMessage('Informe o período para prosseguir!');
      toast.present();
      return false;
    }else if(this.dias == null || this.dias == undefined || this.dias.length == 0){
      toast.setMessage('Informe o(s) dia(s) para prosseguir!');
      toast.present();
      return false;
    }else if(this.questAlimentos == null || this.questAlimentos == undefined || this.questAlimentos.length == 0){
      toast.setMessage('Informe o(s) alimento(s) para prosseguir!');
      toast.present();
      return false;
    }else{
      this.usuario = firebase.auth().currentUser;
      this.quest = new Quest();
      this.quest.alimentos = this.questAlimentos;
      this.quest.periodo = this.periodo;
      this.quest.evitar = this.evitar;
      this.quest.dias = this.dias;
      this.quest.usuario = this.usuario;

      /*CRIACAO DO ALERTA*/
      this.alert = this.alertController.create({
        title:'',
        buttons: [
          { text: 'Ok',
            handler: () => {
              this.navCtrl.setRoot('teste');
            }
          }
        ]
      });
      /*CRIACAO DO LOADING*/
      let loading = this.loadingController.create({
        content: 'Aguarde...'
      });
      
      loading.present();
    }
    
  }

}
