import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../model/user";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {LoginPage} from "../login/login";
import {StorageServiceProvider} from "../../providers/storage-service/storage-service";

/**
 * Generated class for the AmendPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-amend-password',
  templateUrl: 'amend-password.html',
})
export class AmendPasswordPage {

  constructor(public app:App,
              public navCtrl: NavController,
              public navParams: NavParams,
              public userService:UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AmendPasswordPage');
  }

  user:User=new User();
  infoMessage:any;

  /*用户修改密码*/
  amendPassword(){
      this.userService.amendPassword(this.user,data=>{
        if(data.hasOwnProperty("success")){
          this.app.getRootNav().setRoot(LoginPage);
        }
        else{
          this.infoMessage=data["error"]!=null?data["error"]:data;
        }
      });
  }
}
