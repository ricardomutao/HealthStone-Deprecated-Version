import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateQuestPage } from './create-quest';

@NgModule({
  declarations: [
    CreateQuestPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateQuestPage),
  ],
})
export class CreateQuestPageModule {}
