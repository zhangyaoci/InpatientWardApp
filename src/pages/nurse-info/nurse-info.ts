import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Nurse} from "../../model/nurse";

/**
 * Generated class for the NurseInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nurse-info',
  templateUrl: 'nurse-info.html',
})
export class NurseInfoPage {

  nurse:Nurse=new Nurse();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nurse=this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NurseInfoPage');
  }

}
