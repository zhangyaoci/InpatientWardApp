import {Component } from '@angular/core';
import {IonicPage, ItemSliding, NavController, NavParams} from 'ionic-angular';
import {Patient} from "../../model/patient";
import {PatientServiceProvider} from "../../providers/patient-service/patient-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {PatientInfoPage} from "../patient-info/patient-info";


/**
 * Generated class for the PatientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patients',
  templateUrl: 'patients.html',
})
export class PatientsPage {

  people:string="patients";
  patients:Patient[]=new Array();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public patientService:PatientServiceProvider,
              public userService:UserServiceProvider) {
    this.patientService.getPatientsByUserId(this.userService.user["userId"],data=>{
      if(data.hasOwnProperty("patientList")){
        this.patients=data["patientList"];
      }else{
        console.log("用户数据",data);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientsPage');
  }



  //获取病人的全部信息
  getInfoPatient(patient:Patient){
      this.navCtrl.push(PatientInfoPage,patient);
  }


}
