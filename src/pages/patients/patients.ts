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
  patients:Patient[]=new Array();
  doctors:Doctor[] =new Array();
  nurses:Nurse[] = new Array();
  doctorsId:any[] =new Array();
  nursesId:any[] =new Array();


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public patientService:PatientServiceProvider,
              public userService:UserServiceProvider) {
    this.patientService.getPatientsByUserId(this.userService.user["userId"],data=>{
      if(data.hasOwnProperty("patientList")){
        this.patients=data["patientList"];
        //console.log("病人住院",this.patients);
        for(let patient_ of this.patients){
          for(let hospitalization of patient_["hospitalizations"]){
            let flag = true;
            for(let doctorId of this.doctorsId){
              if(hospitalization["doctor"].doctorId==doctorId){
                flag=false;
              }
            }
            if(flag){
              this.doctors.push(hospitalization["doctor"]);
              this.doctorsId.push(hospitalization["doctor"].doctorId);
            }

            let flag_nurse=true;
            for(let nurseId of this.nursesId){
              if(hospitalization["nurse"].nurseId==nurseId){
                flag_nurse=false;
              }
            }
            if(flag_nurse){
              this.nurses.push(hospitalization["nurse"]);
              this.nursesId.push(hospitalization["nurse"].nurseId);
            }

          }
        }

        //console.log("医生",this.doctors);
        //console.log("护士",this.nurses);

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
