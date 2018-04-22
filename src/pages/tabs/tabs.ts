import { Component } from '@angular/core';

import { MenusPage} from "../menus/menus";
import { NewsPage } from '../news/news';
import { PatientsPage } from '../patients/patients';
import {NavParams} from "ionic-angular";
import {User} from "../../model/user";
import {StorageServiceProvider} from "../../providers/storage-service/storage-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  tab1Root = MenusPage;
  tab2Root = NewsPage;
  tab3Root = PatientsPage;

  user:User=new User();
  constructor(public navParams: NavParams,
              public storageService :StorageServiceProvider,
              public userService:UserServiceProvider) {
    //console.log("用户信息",this.navParams.get("user"));
    if(this.navParams.get("user")==null){
     // console.log("storage中保存的数据",this.storageService.read("userLocal"));
      this.user=this.storageService.read("userLocal");
      this.userService.user=this.storageService.read("userLocal");
    }else{
      this.user=this.navParams.get("user");
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad tabPage');
  }
}
