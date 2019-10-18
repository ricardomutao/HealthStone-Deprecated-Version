import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewQuestPage } from './view-quest';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    ViewQuestPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewQuestPage),
    StarRatingModule
  ],
  exports: [
    ViewQuestPage
  ]
})
export class ViewQuestPageModule {}
