import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardsPage } from './rewards';

@NgModule({
  declarations: [
    RewardsPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardsPage)
  ],
  exports: [
    RewardsPage
  ]
})
export class RewardsPageModule {}
