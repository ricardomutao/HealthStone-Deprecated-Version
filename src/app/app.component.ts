import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/account/login/login';
import { FIREBASE_CONFIG } from './enviroment'
import * as firebase from 'firebase';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleBlackTranslucent();
      splashScreen.hide();
    });
    firebase.initializeApp(FIREBASE_CONFIG);
    let user = firebase.auth().currentUser;
    if(user){
      this.rootPage = HomePage;
    }else{
      this.rootPage = LoginPage;
    }
  }

}

