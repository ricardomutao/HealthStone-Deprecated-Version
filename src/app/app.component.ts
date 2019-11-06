import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/account/login/login';
import { FIREBASE_CONFIG } from './enviroment'
import * as firebase from 'firebase';
import { Network } from '@ionic-native/network';
import { DisconnectPage } from '../pages/disconnect/disconnect';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild('myNav') nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private network: Network) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.listenConnection();
    });
    firebase.initializeApp(FIREBASE_CONFIG);
  }

  private listenConnection(): void {
    this.network.onDisconnect()
      .subscribe(() => {
        
        if(this.nav.getActive().id  != 'LoginPage' && this.nav.getActive().id  != 'RegisterPage'){
          this.nav.setRoot(DisconnectPage.name);
        }
        
      });
  }
}

