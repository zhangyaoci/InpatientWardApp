import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HrPage } from './hr';

@NgModule({
  declarations: [
    HrPage,
  ],
  imports: [
    IonicPageModule.forChild(HrPage),
  ],
})
export class HrPageModule {}
