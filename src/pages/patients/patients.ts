import {Component } from '@angular/core';
import {IonicPage, ItemSliding, NavController, NavParams} from 'ionic-angular';
import {Patient} from "../../model/patient";
import {PatientServiceProvider} from "../../providers/patient-service/patient-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {PatientInfoPage} from "../patient-info/patient-info";
import {Doctor} from "../../model/doctor";
import {Nurse} from "../../model/nurse";
import {DoctorInfoPage} from "../doctor-info/doctor-info";
import {NurseInfoPage} from "../nurse-info/nurse-info";


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

  patients:Patient[] = new Array();
  patientIds:any[]   = new Array();
  doctors:Doctor[]   = new Array();
  nurses:Nurse[]     = new Array();


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public patientService:PatientServiceProvider,
              public userService:UserServiceProvider) {

    this.patientService.getPatientsByUserId(this.userService.user["userId"],data=>{
      if(data.hasOwnProperty("success")){
        this.patients=data["success"];
        for(let patient_ of this.patients){
          this.patientIds.push(patient_["patientId"]);
        }
        /*获取病人相应的护士和医生*/
        this.patientService.getDoctorAndNurseByPatientIds(this.patientIds,data_=>{
          if(data_.hasOwnProperty("successOfDoctor")){
            this.doctors=data_["successOfDoctor"];
            this.nurses=data_["successOfNurse"];
          }
          else {
            console.log("错误信息",data_);
          }
        });
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

  //跳转到医生的详细信息
  toDoctor(doctor:Doctor){
    this.navCtrl.push(DoctorInfoPage,doctor);
  }

  //跳转到护士的详细信息
  toNurse(nurse:Nurse){
    this.navCtrl.push(NurseInfoPage,nurse);
  }

}
