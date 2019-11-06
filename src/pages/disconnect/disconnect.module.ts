import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisconnectPage } from './disconnect';

@NgModule({
  declarations: [
    DisconnectPage,
  ],
  imports: [
    IonicPageModule.forChild(DisconnectPage),
  ],
  exports: [
    DisconnectPage
  ]
})
export class DisconnectPageModule {}
