
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from "../../model/user";
import {HttpServiceProvider} from "../http-service/http-service";

/*
  Generated class for the UserServiceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient,public httpService :HttpServiceProvider) {
    console.log('Hello UserServiceProvider Provider');
  }


  //当前使用的用户保存信息
  public user:User;

  //用户注册，调用回调函数
  public  register(user:User,callback:any){
      let urlMethod="/loginAction_register";
      this.httpService.postSerializationPromise(urlMethod,{user:user})
        .then(res=>{
          let resultData=res.hasOwnProperty("message")?res["message"]:"注册失败";
          callback(resultData);
        },err=>{
          let resultData=err.hasOwnProperty("message")?err["message"]:"注册失败";
          callback(resultData);
        });
  }

  //用户登录,调用回调函数
  public  login(user:User,callback:any){
       let urlMethond = "/loginAction_login";
       this.httpService.postSerializationPromise(urlMethond,{user:user})
         .then(res=>{
           if(res.hasOwnProperty("user")){
             this.user=res["user"];
             callback(this.user);
           }
           else{
             let message = res.hasOwnProperty("message")?res["message"]:"登录失败";;
             callback(message);
           }
         },err=>{
           let message= err.hasOwnProperty("message")?err["message"]:"登录失败";
           callback(message);
         });

  }

  //用户修改密码，
  public  amendPassword(user:User,callback:any){
        let urlMethod="/loginAction_amendPassword";
        this.httpService.postSerializationPromise(urlMethod,{user:user})
          .then(res=>{
            let message = res.hasOwnProperty("message")?res["message"]:"密码修改失败";
            callback(message);
          },err=>{
            let message=err.hasOwnProperty("message")?err["message"]:"密码修改失败";
            callback(message);
          })
  }

  //根据电话号码获取唯一用户
  public  getUserByPhone(phone:string,callback:any){
          let urlMethond="/userAction_getUserByPhone";
          this.httpService.postSerializationPromise(urlMethond,{"phone":phone})
            .then(res=>{
              if(res.hasOwnProperty("user")){
                this.user=res["user"];
                callback(this.user);
              }
              else{
                let message = res.hasOwnProperty("message")?res["message"]:"获取用户基本信息失败";
                callback(message);
              }
            },err=>{
                let message = err.hasOwnProperty("message")?err["message"]:"获取用户基本信息失败";
                callback(message);
            });
  }

  //修改用户基础信息
  public updateUser(user:User,callback){
          let urlMethod ="/userAction_editUser";
          this.httpService.postSerializationPromise(urlMethod,{"user":user}).
          then(res=>{
            let message = res.hasOwnProperty("message")?res["message"]:"用户修改信息失败";
            callback(message);
          },err=>{
            let message = err.hasOwnProperty("message")?err["message"]:"用户修改信息失败";
            callback(message);
          });
  }

}
