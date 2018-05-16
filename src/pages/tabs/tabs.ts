import { Component } from '@angular/core';

import { MenusPage} from "../menus/menus";
import { NewsPage } from '../news/news';
import { PatientsPage } from '../patients/patients';
import {NavParams} from "ionic-angular";
import {User} from "../../model/user";
import {StorageServiceProvider} from "../../providers/storage-service/storage-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {InformationServiceProvider} from "../../providers/information-service/information-service";



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  tab1Root = MenusPage;
  tab2Root = NewsPage;
  tab3Root = PatientsPage;

  private badgeNumber={"number":0};/*表示没有被阅读的消息*/

  constructor(public navParams: NavParams,
              public storageService :StorageServiceProvider,
              public userService:UserServiceProvider,
              public informationService:InformationServiceProvider) {
    if(this.userService.user==null){
      // console.log("storage中保存的数据",this.storageService.read("userLocal"));
      this.userService.user=this.storageService.read("userLocal");
      this.informationService.getInformation(this.userService.user["userId"],data=>{
        if(data.hasOwnProperty("success")){
          this.badgeNumber = this.informationService.noRead;
        }
        else{
          console.log(data["error"]);
        }
      });
    }else{
      /*在不为空的时候也要获取消息*/
      this.informationService.getInformation(this.userService.user["userId"],data=>{
        if(data.hasOwnProperty("success")){
          this.badgeNumber = this.informationService.noRead;
        }
        else {
          console.log(data["error"]);
        }
      });
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad tabPage');
  }


}
