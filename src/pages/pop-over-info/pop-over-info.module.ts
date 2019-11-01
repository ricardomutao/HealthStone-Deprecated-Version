import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopOverInfoPage } from './pop-over-info';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule, MatCardModule, MatTabsModule, MatChipsModule, MatIconModule, MatToolbarModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule } from "@angular/material";


@NgModule({
  declarations: [
    PopOverInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PopOverInfoPage),
    MatProgressBarModule,
		MatButtonModule,
		MatCardModule,
		MatTabsModule,
		MatChipsModule,
		MatIconModule,
		MatToolbarModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatNativeDateModule
  ],
  exports: [
    PopOverInfoPage
  ]
})
export class PopOverInfoPageModule {}
