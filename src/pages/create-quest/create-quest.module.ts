import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateQuestPage } from './create-quest';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    CreateQuestPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateQuestPage),
    StarRatingModule,
  ],
  exports:[
    CreateQuestPage
  ]
})
export class CreateQuestPageModule {}
