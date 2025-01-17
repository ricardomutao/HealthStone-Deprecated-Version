import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryPage } from './inventory';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    InventoryPage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryPage),
    StarRatingModule
  ],
  exports: [
    InventoryPage
  ]
})
export class InventoryPageModule {}
