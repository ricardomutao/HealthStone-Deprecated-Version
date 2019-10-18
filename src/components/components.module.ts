import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu';
import { IonicModule } from 'ionic-angular';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
	declarations: [
		MenuComponent
	],
	imports: [
		IonicModule,
		MatProgressBarModule
	],
	exports: [MenuComponent]
})
export class ComponentsModule {}
