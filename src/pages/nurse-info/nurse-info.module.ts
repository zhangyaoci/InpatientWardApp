import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NurseInfoPage } from './nurse-info';

@NgModule({
  declarations: [
    NurseInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(NurseInfoPage),
  ],
})
export class NurseInfoPageModule {}
