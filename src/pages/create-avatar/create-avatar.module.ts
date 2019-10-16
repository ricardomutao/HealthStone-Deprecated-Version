import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateAvatarPage } from './create-avatar';

@NgModule({
  declarations: [
    CreateAvatarPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateAvatarPage),
  ],
})
export class CreateAvatarPageModule {}
