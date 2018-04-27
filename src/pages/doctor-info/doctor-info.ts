import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Doctor} from "../../model/doctor";

/**
 * Generated class for the DoctorInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor-info',
  templateUrl: 'doctor-info.html',
})
export class DoctorInfoPage {

  doctor:Doctor = new Doctor();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.doctor=navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorInfoPage');
  }

}
