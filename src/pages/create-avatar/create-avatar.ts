import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

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
  //Objeto avatar: Aqui todas as características são inicializadas
  avatar = {
    hair: "ShortHairShortCurly",
    clothes: "ShirtCrewNeck",
    beard: "Blank",
    accessories: "Blank",
    hairColor: "Black",
    hatColor: "Black",
    colorFabric: "Black",
    graphic: "Bat",
    beardColor: "Black",
    eye: "Default",
    eyebrow: "Default",
    mouth: "Default",
    skin: "Light"
  };


  //A parte mais importante desta tela é a variável abaixo, que manda os dados para a api e retorna como imagem
  url;
  usuario;

  //Inicialização das variáveis que definem quais opções aparecem na tela
  notShowBeard = false;
  notShowAccessories = false;
  notShowHatColor = false;
  notShowHairColor = false;
  notShowFabric = false;
  notShowGraphic = false;
  notShowBeardColor = false;
  


  constructor(public navCtrl: NavController, public navParams: NavParams,) {
    this.usuario = navParams.get('user');
    this.url = this.usuario.url;
    console.log(this.usuario);
  }


  ionViewDidLoad() {
    this.separaURL();
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
                  + '&topType='   	    + this.avatar.hair 
                  + '&clotheType='      + this.avatar.clothes 
                  + '&facialHairType='  + this.avatar.beard
                  + '&accessoriesType=' + this.avatar.accessories
                  + '&hairColor='       + this.avatar.hairColor
                  + '&hatColor='        + this.avatar.hatColor
                  + '&clotheColor='     + this.avatar.colorFabric
                  + '&graphicType='     + this.avatar.graphic
                  + '&facialHairColor=' + this.avatar.beardColor
                  + '&eyeType='         + this.avatar.eye
                  + '&eyebrowType='     + this.avatar.eyebrow
                  + '&mouthType='       + this.avatar.mouth
                  + '&skinColor='       + this.avatar.skin
                  + '&'
                  ; 

    //Chama as funções que validam os campos
    this.validaBarba();
    this.validaAcessorio();
    this.validaCorChapeuCabelo();
    this.validaCorRoupaLogo();
    this.validaCorBarba();

    this.usuario.url = this.url;

    console.log(this.url);

  }

  //Valida se a opção barba pode ser alterada
  validaBarba(){
    if(this.avatar.hair == "Hijab"){
      this.notShowBeard = true;
    }else{
      this.notShowBeard = false;
    }
  }

  //Valida se a opção acessório pode ser alterada
  validaAcessorio(){
    if(this.avatar.hair == "Eyepatch"){
      this.notShowAccessories = true;
    }else{
      this.notShowAccessories = false;
    }
  }

  //Valida se as opções cor de chapéu e cor de cabelo podem ser alteradas
  validaCorChapeuCabelo(){
    if(
      this.avatar.hair == "Eyepatch"      ||
      this.avatar.hair == "NoHair"        ||
      this.avatar.hair == "Hat"           ||
      this.avatar.hair == "LongHairFrida" ||
      this.avatar.hair == "LongHairShavedSides"
    ){
        this.notShowHairColor = true;
        this.notShowHatColor = true;

    }else if(
      this.avatar.hair == "Hijab"      ||
      this.avatar.hair == "Turban"     ||
      this.avatar.hair == "WinterHat1" ||
      this.avatar.hair == "WinterHat2" ||
      this.avatar.hair == "WinterHat3" ||
      this.avatar.hair == "WinterHat4" 
    ){
        this.notShowHairColor = true;
        this.notShowHatColor = false;

    }else{
        this.notShowHairColor = false;
        this.notShowHatColor = true;
    }
  }

  //Valida se as opções cor da roupa e logo podem ser alteradas
  validaCorRoupaLogo(){
    if(
      this.avatar.clothes == "BlazerShirt"   ||
      this.avatar.clothes == "BlazerSweater" 
    ){
        this.notShowFabric = true;
        this.notShowGraphic = true;
    }else if(this.avatar.clothes == "GraphicShirt" ){
        this.notShowFabric = false;
        this.notShowGraphic = false;
    }else{
        this.notShowFabric = false;
        this.notShowGraphic = true;
    }
  }

  //Valida se a opção cor da barba pode ser alterada
  validaCorBarba(){
    if(
      this.avatar.beard == "Blank" || 
      this.avatar.hair == "Hijab"
    ){
        this.notShowBeardColor = true;
    }else{
        this.notShowBeardColor = false;
    }
  }


  separaURL(){


    let regexComercial = new RegExp('&([^&]+)', 'g');
    
    let atributo;

    while ((atributo = regexComercial.exec(this.url))) { 				
      

      let regexIgual = new RegExp('([^=]+)', 'g');

      let preIgual;
      let posIgual;

      preIgual = regexIgual.exec(atributo[1]);
      posIgual = regexIgual.exec(atributo[1]);

      switch(preIgual){
        case 'topType':
          this.avatar.hair = posIgual;
          break;
        case 'clotheType':
          this.avatar.clothes = posIgual;
          break;
        case 'facialHairType':
          this.avatar.beard = posIgual;
          break;
        case 'accessoriesType':
          this.avatar.accessories = posIgual;
          break;
        case 'hairColor':
          this.avatar.hairColor = posIgual;
          break;
        case 'hatColor':
          this.avatar.hatColor = posIgual;
          break;
        case 'clotheColor':
          this.avatar.colorFabric = posIgual;
          break;
        case 'graphicType':
          this.avatar.graphic = posIgual;
          break;
        case 'facialHairColor':
          this.avatar.beardColor = posIgual;
          break;
        case 'eyeType':
          this.avatar.eye = posIgual;
          break;
        case 'eyebrowType':
          this.avatar.eyebrow = posIgual;
          break;
        case 'mouthType':
          this.avatar.mouth = posIgual;
          break;
        case 'skinColor':
          this.avatar.skin = posIgual;
          break;
      }
      
    }
  }


}
