import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Quest } from '../../models/quest';
import { QuestAlimentos } from '../../models/questAlimentos';

/**
 * Generated class for the ViewQuestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-quest',
  templateUrl: 'view-quest.html',
})
export class ViewQuestPage {

  @ViewChild(Slides) slides: Slides;

  param:Quest;

  tab:string = 'alimentos';

  /*formulario*/
  titulo:string = '';
  dias:any = [];
  periodo:string = '';
  evitar:boolean = false;
  starRating:number;
  time:string = '00:00';

  questAlimentos: QuestAlimentos[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.param = this.navParams.get('questSelected');
  }

  ionViewDidLoad() {

    this.questAlimentos = this.param.alimentos;
    this.titulo = this.param.titulo;
    this.dias = this.param.dias;
    this.periodo = this.param.periodo;
    this.evitar = this.param.evitar;
    this.starRating = this.param.dificuldade;
    this.time = this.param.horario
   
  }

  changeTab(){
    if(this.slides.isEnd()){
      this.tab = 'detalhes';
    }else if(this.slides.isBeginning()){
      this.tab = 'alimentos';
    }
  }

  changeSlideForward(){
    this.slides.slideNext();
  }
  changeSlideBack(){
    this.slides.slidePrev();
  }

}
