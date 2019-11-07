import { Injectable } from '@angular/core';
import { ToastController, LoadingController, Alert, AlertController, Loading } from 'ionic-angular';

@Injectable()
export class UtilsServiceProvider {

  loading:Loading;
  alert: Alert;

  constructor(
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController) {
  }

  creatToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Fechar',
      cssClass: 'changeToast',
      duration: 3000,
      dismissOnPageChange: true

    });
    toast.present();
  }

  creatToastSuccess(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Fechar',
      cssClass: 'changeToastSuccess',
      duration: 3000,
      dismissOnPageChange: true

    });
    toast.present();
  }

  loadingShow(){
    this.loading = this.loadingController.create({
      content: 'Aguarde...'
    });
    this.loading.present();
  }

  loadingHide(){
    this.loading.dismiss();
  }

  creatSimpleAlert(msg){
    let alert: Alert;
    alert = this.alertController.create({
      subTitle:msg,
      buttons: [
        { text: 'Ok'}
      ]
    });
    alert.present();
  }

  disconnectAlertShow(){
    this.alert = this.alertController.create({
      title:'Ops!',
      message:'Parece que você se desconectou da internet! Aguardando reconexão...',
      enableBackdropDismiss: false
    });
    this.alert.present();
  }

  disconnectAlertHide(){
    this.alert.dismiss();
  }

}
