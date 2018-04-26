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
              public userService:UserServiceProvider,
              public storageService:StorageServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AmendPasswordPage');
  }

  user:User=new User();
  infoMessage:any;

  //修改密码
  amendPassword(){
      this.userService.amendPassword(this.user,message=>{
        if(message=="密码修改成功"){
          this.storageService.remove("phone");
          this.storageService.clear();
          this.app.getRootNav().setRoot(LoginPage);
        }
        else{
          this.infoMessage=message;
        }
      });
  }
}
