import { Injectable } from '@angular/core';
import { User} from "../../model/user";
import { HttpServiceProvider} from "../http-service/http-service";
import { StorageServiceProvider} from "../storage-service/storage-service";
import { UtilServiceProvider} from "../util-service/util-service";
import {InformationServiceProvider} from "../information-service/information-service";

/*
  Generated class for the UserServiceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  /*当前使用的用户保存信息*/
  public user:User;


  constructor(public httpService :HttpServiceProvider,
              public storageService:StorageServiceProvider,
              public utilService:UtilServiceProvider,
              public informationService:InformationServiceProvider) {
    console.log('Hello UserServiceProvider Provider');
  }




  /*用户注册，调用回调函数*/
  public  register(user:User,callback:any){

      let phone = user["phone"];
      let password=this.utilService.encodePassword(user["password"]);

      this.utilService.encodePassword(user["password"]);
      let urlMethod="/loginAction_register";
      this.httpService.postSerializationObservable(urlMethod,{'phone':phone,'password':password})
        .subscribe(
          res=>{
            if(res.hasOwnProperty("success")){
              this.user = res["success"];
              this.storageService.write("userLocal",this.user);
            }
            callback(res);
          },
          err=>{
            callback({"error":"注册失败"});
          });
  }


  /*用户登录,调用回调函数*/
  public  login(user:User,callback:any){

       let phone = user["phone"];
       let password=this.utilService.encodePassword(user["password"]);


       let urlString = "/loginAction_login";
       this.httpService.postSerializationObservable(urlString,{"phone":phone,"password":password})
         .subscribe(
           res=>{
               if(res.hasOwnProperty("success")){
                 this.user=res["success"];
                 /*保存登录成功之后的用户*/
                 this.storageService.write("userLocal",this.user);
                }
               callback(res);
           },
           err=>{
               callback({"error":"登录失败"});
           });

  }

  /*用户修改密码*/
  public  amendPassword(user:User,callback:any){

        let phone = user["phone"];
        let password=this.utilService.encodePassword(user["password"]);

        let urlMethod="/loginAction_amendPassword";
        this.httpService.postSerializationObservable(urlMethod,{'phone':phone,'password':password})
          .subscribe(
            res=>{
                if(res.hasOwnProperty("success")){
                  /*在**之后，删除以前用信息*/
                  this.informationService.updateIsPopToZeroForInformationUser(this.user["userId"],
                    data=>{
                      if(data.hasOwnProperty("success")){
                        /*清空内存*/
                        this.informationService.destroyData();
                        this.destroyData();
                        this.storageService.clear();
                      }
                    });
                }
                callback(res);
            },
            err=>{
              callback({"error":"密码修改失败"});
            });
  }


  /*根据电话号码获取唯一用户*/
  public  getUserByPhone(phone:string,callback:any){
          let urlMethond="/userAction_getUserByPhone";
          this.httpService.postSerializationObservable(urlMethond,{"phone":phone})
            .subscribe(
              res=>{
                  if(res.hasOwnProperty("user")){
                    this.user=res["user"];
                    callback(this.user);
                  }
                  else{
                    let message = res.hasOwnProperty("message")?res["message"]:"获取用户基本信息失败";
                    callback(message);
                  }
              },
              err=>{
                let message = err.hasOwnProperty("message")?err["message"]:"获取用户基本信息失败";
                callback(message);
               });
  }


  //修改用户基础信息
  public updateUser(user:User,callback){
          let urlMethod ="/userAction_editUser";
          this.httpService.postSerializationObservable(urlMethod,{"user":user})
            .subscribe(
              res=>{
                if(res.hasOwnProperty("success")){
                  this.user = res["success"];
                  this.storageService.write("userLocal",this.user);
                }
                callback(res);
              },
                err=>{
                callback("用户信息修改失败");
              });
  }

  /*销毁所有服务里面数据*/
  public destroyData(){
    this.user=null;
  }

}
