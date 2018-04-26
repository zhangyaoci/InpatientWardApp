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

  //根据用户Id获取所关联的病人信息
  public getPatientsByUserId(userId:number,callback:any){
    let urlMethod = "/peopleAction_getPatientsByUserId";
    this.httpService.postSerializationPromise(urlMethod,{"userId":userId})
      .then(res=>{
        if(res.hasOwnProperty("patientList")){
          callback(res);
        }
        else{
          callback("获取用户失败");
        }
      },err=>{
        callback("获取用户失败");
      });
  }

  //根据病人的Id获取病人的住院记录
  public  getHospitalizationBypatientId(patientId:number,callback:any){
    let urlMethod="/hospitalizationAction_getHospitalizationByPatientId";
    this.httpService.postSerializationPromise(urlMethod,{"patientId":patientId})
      .then(
        res=>{
          if(res.hasOwnProperty("hospitalizationList")){
            callback(res);
          }
          else {
            callback("获取用户住院信息失败");
          }
        },err=>{
          callback("获取用户住院信息失败");
        }
      );
  }

  //根据病人获得监护人的信息
  public getUserOfGuardianByPatientId(patientId:number,callback:any){
    let urlMethod ="/userAction_getUserOfGuardianByPatientId";
    this.httpService.postSerializationPromise(urlMethod,{"patientId":patientId})
      .then(
        res=>{
          if(res.hasOwnProperty("user")){
            callback(res);
          }
          else {
            callback("获取监护人信息失败");
          }
        },err=>{
            callback("获取监护人信息失败");
        }
      );
  }

}
