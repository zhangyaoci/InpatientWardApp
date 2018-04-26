import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PatientServiceProvider} from "../../providers/patient-service/patient-service";
import {Patient} from "../../model/patient";
import {Hospitalization} from "../../model/hospitalization";
import {User} from "../../model/user";

/**
 * Generated class for the PatientInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-info',
  templateUrl: 'patient-info.html',
})
export class PatientInfoPage {

  patient:Patient=new Patient();
  hospitalizations:Hospitalization[]=new Array();
  userOfGuardian:User=new User();


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public patientService:PatientServiceProvider) {

    this.patient=this.navParams.data;

    //获取住院记录
    this.patientService.getHospitalizationBypatientId(this.navParams.data["patientId"],data=>{
      if(data.hasOwnProperty("hospitalizationList")){
        this.hospitalizations=data["hospitalizationList"];
      }
      else{
        console.log(data);
      }});

    //获取监护人信息
    this.patientService.getUserOfGuardianByPatientId(this.navParams.data["patientId"],data=>{
      if(data.hasOwnProperty("user")){
        this.userOfGuardian=data["user"];
      }else {
        console.log(data);
      }});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientInfoPage');
  }

}
