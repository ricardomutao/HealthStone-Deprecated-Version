import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MyApp } from './app.component';
import { LoginPageModule } from '../pages/account/login/login.module';
import { UtilsServiceProvider } from '../providers/utils/utils-service';
import { CreatQuestServiceProvider } from '../providers/creat-quest-service/creat-quest-service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilsServiceProvider,
    CreatQuestServiceProvider
  ]
})
export class AppModule {}
