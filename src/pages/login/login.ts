import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';


import {HttpServiceProvider} from "../../providers/http-service/http-service";
import {User} from "../../model/user";
import {AmendPasswordPage} from "../amend-password/amend-password";
import {RegisterPage} from "../register/register"
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {StorageServiceProvider} from "../../providers/storage-service/storage-service";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[HttpServiceProvider]
})
export class LoginPage {


  user:User=new User();
  message:any;

  /*注入Service服务*/
  constructor(private app: App,
              public navCtrl: NavController,
              public navParams: NavParams,
              public userService:UserServiceProvider,
              public storageService:StorageServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //忘记密码
  forgetPassword(){
    this.navCtrl.push(AmendPasswordPage);
  }

  //新用户注册
  registerUser(){
    this.navCtrl.push(RegisterPage);
  }





  //用户进行登录验证
  doLogin() {
   this.userService.login(this.user,returnMessage=>{
     if(returnMessage.hasOwnProperty("phone")){
       this.storageService.write("userLocal",returnMessage);
       this.app.getRootNav().setRoot(TabsPage);
     }
     else{
       this.message=returnMessage;
     }});
  }
}
