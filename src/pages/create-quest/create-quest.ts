import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert, Slides } from 'ionic-angular';
import * as firebase from 'firebase';
import { Alimento } from '../../models/alimento';
import { QuestAlimentos } from '../../models/questAlimentos';
import { Quest } from '../../models/quest';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';
import { QuestServiceProvider } from '../../providers/quest-service/quest-service';
import { HttpErrorResponse } from '@angular/common/http';
import { HomePage } from '../home/home';
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

  @ViewChild(Slides) slides: Slides;

  alimentos: Alimento[] = [];
  filterAlimentos: Alimento [] = [];
  questAlimentos: QuestAlimentos[] = [];

  tab:string = 'alimentos';

  /*usuario logado*/
  usuario:any;

  /*formulario*/
  titulo:string = '';
  dias:any = [];
  periodo:string = '';
  evitar:boolean = false;
  starRating:number;
  time:string = '00:00';

  /*objeto para gravar a quest*/
  quest:Quest;

  alert: Alert;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public utils: UtilsServiceProvider,
    public questService: QuestServiceProvider) {
  }

  ionViewDidLoad() {
    this.initializeItems();
  }

  getItems(ev: any) {

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterAlimentos = this.alimentos;
      this.filterAlimentos = this.filterAlimentos.filter((item) => {
        return (item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.filterAlimentos = this.alimentos;
    }
  }

  initializeItems(){
    this.utils.loadingShow();
    let that = this;
    //Pegando todos alimentos do banco de dados alimentado
    this.questService.getAlimentos().subscribe(
      (alimento:any) => {
        alimento.forEach(function(obj){

          let objAlimento = {
            descricao: obj.description,
            unidade: obj.base_unit,
            kcal: obj.attributes.energy.kcal,
            baseQtd:  obj.base_qty
          }
  
          that.alimentos.push(objAlimento);
        });
        
        this.utils.loadingHide();
      },
      (err:HttpErrorResponse) => {
        //console.log(err);
        this.utils.loadingHide();
        this.utils.creatSimpleAlert('Erro ao listar os alimentos');
      }
    )
   
  }

  setQtd(alimento:Alimento){
   
    const prompt = this.alertCtrl.create({
      title: 'Quantidade',
      message: 'Coloque a quantidade do alimento selecionado. Unidade('+alimento.unidade+').  ('+(alimento.kcal/alimento.baseQtd).toFixed(2)+' Kcal/'+alimento.unidade+') aproximadamente',
      inputs: [
        {
          name: 'qtd',
          placeholder: 'Qtd.',
          type:'number'
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
    
    this.utils.loadingShow();

    let data = new Date();
    let kcalTotal = 0;

    this.usuario = firebase.auth().currentUser.email;
    this.quest = new Quest();
    this.quest.alimentos = this.questAlimentos;
    this.quest.periodo = this.periodo;
    this.quest.evitar = this.evitar;
    this.quest.dias = this.dias;
    this.quest.usuario = btoa(this.usuario);
    this.quest.dataCriacao = (data.toISOString().substr(0, 10).split('-').reverse().join('/'));
    this.quest.id = data.getTime().toString();
    this.quest.dificuldade = this.starRating;
    this.quest.horario = this.time;
    this.quest.titulo = this.titulo;
    this.quest.status = 0;

    this.questAlimentos.forEach(function(obj){
      let op1 = parseFloat(((obj.alimento.kcal)/(obj.alimento.baseQtd)).toFixed(2));
      let op2 = parseFloat((op1 * obj.qtd).toFixed(2));
      kcalTotal += op2;
    });

    this.quest.kcalTotal = kcalTotal.toFixed(2);

    this.alert = this.alertCtrl.create({
      subTitle:'',
      buttons: [
        { text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot(HomePage.name);
          }
        }
      ]
    });

    this.questService.saveQuest(this.quest.id,this.quest).then(() => {
      this.utils.loadingHide();

      this.alert.setSubTitle('Missão criada com sucesso!');
      this.alert.present();

    }).catch((error: Error) => {
      this.utils.loadingHide();
      this.utils.creatSimpleAlert('Erro na operação!');
    })
    
  }

  showConfirm() {

    if(this.slides.isBeginning()){
      if(this.questAlimentos == null || this.questAlimentos == undefined || this.questAlimentos.length == 0){
        this.utils.creatToast('Informe o(s) alimento(s) para prosseguir!');
        return false;
      }else if(this.titulo == '' || this.titulo == null || this.titulo == undefined){
        this.utils.creatToast('Informe o título para prosseguir!');
        this.tab = 'detalhes';
        this.slides.slideNext();
        return false;
      }else if(this.periodo == '' || this.periodo == null || this.periodo == undefined){
        this.utils.creatToast('Informe o período para prosseguir!');
        this.tab = 'detalhes';
        this.slides.slideNext();
        return false;
      }else if(this.dias == null || this.dias == undefined || this.dias.length == 0){
        this.utils.creatToast('Informe o(s) dia(s) para prosseguir!');
        this.tab = 'detalhes';
        this.slides.slideNext();
        return false;
      }else if(this.starRating == null || this.starRating == undefined || this.starRating == 0){
        this.utils.creatToast('Informe a dificuldade para prosseguir!');
        this.tab = 'detalhes';
        this.slides.slideNext();
        return false;
      }else if(this.time == '' || this.time == undefined || this.time == null){
        this.utils.creatToast('Informe o horário para prosseguir!');
        this.tab = 'detalhes';
        this.slides.slideNext();
        return false;
      }
    }else{
      if(this.titulo == '' || this.titulo == null || this.titulo == undefined){
        this.utils.creatToast('Informe o título para prosseguir!');
        return false;
      }else if(this.periodo == '' || this.periodo == null || this.periodo == undefined){
        this.utils.creatToast('Informe o período para prosseguir!');
        return false;
      }else if(this.dias == null || this.dias == undefined || this.dias.length == 0){
        this.utils.creatToast('Informe o(s) dia(s) para prosseguir!');
        return false;
      }else if(this.starRating == null || this.starRating == undefined || this.starRating == 0){
        this.utils.creatToast('Informe a dificuldade para prosseguir!');
        return false;
      }else if(this.time == '' || this.time == undefined || this.time == null){
        this.utils.creatToast('Informe o horário para prosseguir!');
        return false;
      }else if(this.questAlimentos == null || this.questAlimentos == undefined || this.questAlimentos.length == 0){
        this.utils.creatToast('Informe o(s) alimento(s) para prosseguir!');
        this.tab = 'alimentos';
        this.slides.slidePrev();
        return false;
      }
    }

    const confirm = this.alertCtrl.create({
      title: 'Confirmar Missão',
      message: 'Tem certeza que deseja confirmar e finalizar a criação dessa missão?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.criarQuest();
          }
        }
      ]
    });
    confirm.present(); 
    
  }

  changeTab(){
    this.filterAlimentos = [];
    if(this.slides.isEnd()){
      this.tab = 'detalhes';
    }else if(this.slides.isBeginning()){
      this.tab = 'alimentos';
    }
  }

  changeSlide(index){
    this.filterAlimentos = [];
    this.slides.slideTo(index);
  }

  getAllAlimentos(){
    if(!this.filterAlimentos || this.filterAlimentos.length == 0){
      this.filterAlimentos = this.alimentos;
    }
  }

}
