import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpServiceProvider} from "../http-service/http-service";

/*
  Generated class for the PatientServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PatientServiceProvider {

  constructor(public http: HttpClient,
              public httpService:HttpServiceProvider) {
    console.log('Hello PatientServiceProvider Provider');
  }

  /*根据用户Id获取所关联的病人信息*/
  public getPatientsByUserId(userId:number,callback:any){
    let urlMethod = "/peopleAction_getPatientsByUserId";
    this.httpService.postSerializationObservable(urlMethod,{"userId":userId})
      .subscribe(
        res=>{
           callback(res);
        },
        err=>{
           callback({"error":"获取用户失败"});
        });
  }



 /*根据病人的Id获取病人的住院记录*/
  public  getHospitalizationBypatientId(patientId:number,callback:any){
    let urlMethod="/peopleAction_getHospitalizationByPatientId";
    this.httpService.postSerializationObservable(urlMethod,{"patientId":patientId})
      .subscribe(
        res=>{
            callback(res);
          },
        err=>{
            callback({"error":"获取用户住院信息失败"});
        });
  }

 /*根据病人获得监护人的信息*/
  public getUserOfGuardianByPatientId(patientId:number,callback:any){
    let urlMethod ="/userAction_getUserOfGuardianByPatientId";
    this.httpService.postSerializationObservable(urlMethod,{"patientId":patientId})
      .subscribe(
        res=>{
          callback(res);
        },
        err=>{
          callback({"error":"获取病人的监护人错误"});
        });
  }

  /*根据病人的ID号，找到对应的住院信息，把相应的医生和护士的信息找出来*/
  public  getDoctorAndNurseByPatientIds(patientIds:any,callback:any){
    let urlString = "/peopleAction_getDoctorAndNurseByPatientIds";
    this.httpService.postSerializationObservable(urlString,{"patientIds":patientIds})
      .subscribe(
        res=>{
          callback(res);
        },
        err=>{
          callback({"error":"获取医生和护士信息失败"});
        }
      );
  }

}
