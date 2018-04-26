import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemPage } from './tem';

@NgModule({
  declarations: [
    TemPage,
  ],
  imports: [
    IonicPageModule.forChild(TemPage),
  ],
})
export class TemPageModule {}
