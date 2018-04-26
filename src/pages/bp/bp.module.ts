import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BpPage } from './bp';

@NgModule({
  declarations: [
    BpPage,
  ],
  imports: [
    IonicPageModule.forChild(BpPage),
  ],
})
export class BpPageModule {}
