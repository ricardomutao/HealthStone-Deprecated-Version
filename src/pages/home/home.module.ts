import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage,
    MenuPage
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
