import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AmendPasswordPage } from './amend-password';

@NgModule({
  declarations: [
    AmendPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(AmendPasswordPage),
  ],
})
export class AmendPasswordPageModule {}
