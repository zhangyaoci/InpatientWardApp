import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/*添加下面的选择栏*/
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from "../pages/login/login";

/*引入服务*/
import {StorageServiceProvider}  from '../providers/storage-service/storage-service'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  /*首先进入的是登录页面*/
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,storageService:StorageServiceProvider) {

      /*本地存储用户信息*/
      if(storageService.read('userLocal')) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
      platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          statusBar.styleDefault();
          splashScreen.hide();
      });
  }




}

