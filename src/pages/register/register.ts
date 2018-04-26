import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../model/user";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {TabsPage} from "../tabs/tabs";
import {StorageServiceProvider} from "../../providers/storage-service/storage-service";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(private app: App,
              public navCtrl: NavController,
              public navParams: NavParams,
              public userService:UserServiceProvider,
              public storageService:StorageServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  /*基本用户信息*/
  user:User=new User();
  message;
  registerUser(){
   this.userService.register(this.user,resultMessage=>{
     if(resultMessage=="注册成功"){
       this.storageService.write("userLocal",this.user);
       this.app.getRootNav().setRoot(TabsPage);
     }
     else{
       this.message=resultMessage;
     }});
  }
}
