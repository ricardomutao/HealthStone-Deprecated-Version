import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ComponentsModule } from '../../components/components.module';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(HomePage),
    StarRatingModule
  ],
  exports:[
    HomePage
  ]
})
export class HomePageModule {}
