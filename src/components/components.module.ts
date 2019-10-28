import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu';
import { IonicModule } from 'ionic-angular';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatButtonModule, MatCardModule, MatTabsModule, MatChipsModule, MatIconModule, MatToolbarModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule } from "@angular/material";

@NgModule({
	declarations: [
		MenuComponent
	],
	imports: [
		IonicModule,
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
	exports: [MenuComponent]
})
export class ComponentsModule {}
