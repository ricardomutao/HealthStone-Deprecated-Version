import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { User } from '../../models/user';
import { AccountServiceProvider } from '../../providers/account-service/account-service';
import { UtilsServiceProvider } from '../../providers/utils/utils-service';

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
    hair: "Hat",
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
  user:User;

  //Inicialização das variáveis que definem quais opções aparecem na tela
  notShowBeard = false;
  notShowAccessories = false;
  notShowHatColor = false;
  notShowHairColor = false;
  notShowFabric = false;
  notShowGraphic = false;
  notShowBeardColor = false;
  
  alert: Alert;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public accountService: AccountServiceProvider,
    public utils: UtilsServiceProvider
  ) {
    this.user = this.navParams.get('user');
  }

  

  ionViewDidLoad() {
    
    
    this.url = this.user.url;
    
    this.separaURL();
    
  }

  //Função provisória para carater de testes
  

  //Separa a URL para montar o objeto
  separaURL(){

    let regexComercial = new RegExp('&([^&]+)', 'g');
    
    let atributo;
    
    //console.log("Antes de separaURL", this.url);

    while ((atributo = regexComercial.exec(this.url))) { 				
      
      let regexIgual = new RegExp('([^=]+)', 'g');

      let preIgual;
      let posIgual;

      preIgual = regexIgual.exec(atributo[1]);
      posIgual = regexIgual.exec(atributo[1]);

      switch(preIgual[1]){
        case 'topType':
          this.avatar.hair = posIgual[1];
          break;
        case 'clotheType':
          this.avatar.clothes = posIgual[1];
          break;
        case 'facialHairType':
          this.avatar.beard = posIgual[1];
          break;
        case 'accessoriesType':
          this.avatar.accessories = posIgual[1];
          break;
        case 'hairColor':
          this.avatar.hairColor = posIgual[1];
          break;
        case 'hatColor':
          this.avatar.hatColor = posIgual[1];
          break;
        case 'clotheColor':
          this.avatar.colorFabric = posIgual[1];
          break;
        case 'graphicType':
          this.avatar.graphic = posIgual[1];
          break;
        case 'facialHairColor':
          this.avatar.beardColor = posIgual[1];
          break;
        case 'eyeType':
          this.avatar.eye = posIgual[1];
          break;
        case 'eyebrowType':
          this.avatar.eyebrow = posIgual[1];
          break;
        case 'mouthType':
          this.avatar.mouth = posIgual[1];
          break;
        case 'skinColor':
          this.avatar.skin = posIgual[1];
          break;
      }
      
    }

    this.chamaValidacoes();

    //console.log("Depois de separado: ", this.avatar);
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

    this.chamaValidacoes();

    //this.user.url = this.url;

    //console.log(this.url);

  }

  //Chama as funções que validam os campos
  chamaValidacoes(){
    this.validaBarba();
    this.validaAcessorio();
    this.validaCorChapeuCabelo();
    this.validaCorRoupaLogo();
    this.validaCorBarba();
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

  salvarURL(){


    this.utils.loadingShow();

    this.alert = this.alertCtrl.create({
      subTitle:'',
      buttons: [
        { text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });

    let connectionState = this.accountService.connectionState();

    if(connectionState){
      this.accountService.updateUser(this.user,{url: this.url}).then(() =>{
        this.utils.loadingHide();
        this.alert.setSubTitle('Avatar alterado com sucesso!');
        this.alert.present();
  
      }).catch((error: Error) => {
        this.utils.loadingHide();
        this.alert.setSubTitle('Falha na alteração');
        this.alert.present();
      })
    }else{
      this.utils.loadingHide();
      this.utils.creatToast('Verifique sua conexão com a internet para prosseguir!');
    }

    
    
  }

  confirmaSalvar(){
    const confirm = this.alertCtrl.create({
      title: 'Confirmar Alteração',
      message: 'Tem certeza que deseja confirmar a alteração do avatar?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.salvarURL();
          }
        }   
      ]
    });
    confirm.present(); 
  }


  


}
