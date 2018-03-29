import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';


import {HttpServiceProvider} from "../../providers/http-service/http-service";
import {User} from "../../model/user";


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

  /*注入Service服务*/
  constructor(private app: App,public navCtrl: NavController, public navParams: NavParams,public httpService:HttpServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  //登录成后跳转的页面
  loginOnSuccess(){
    this.app.getRootNav().setRoot(TabsPage);
  }


  //用户进行登录验证
  doLogin() {
    this.loginOnSuccess();
    /*let urlMethod = '/loginAction_login';
    this.httpService.postSerialization(urlMethod, this.user).then(
      res=>{
         console.log(JSON.stringify(res));
         this.loginOnSuccess();
        },err=>{
            console.log("错误信息"+err)
      }).catch(exception=>{
        console.log("报错信息"+exception)
    });*/
  }
}
