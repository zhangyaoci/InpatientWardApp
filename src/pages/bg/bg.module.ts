import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BgPage } from './bg';

@NgModule({
  declarations: [
    BgPage,
  ],
  imports: [
    IonicPageModule.forChild(BgPage),
  ],
})
export class BgPageModule {}
