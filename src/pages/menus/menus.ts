import {Component, ViewChild} from '@angular/core';
import {App, IonicPage, Nav, NavController, NavParams} from 'ionic-angular';
import {HomePage}  from '../home/home';
import {InfoPage} from  "../info/info";
import {AmendPasswordPage} from "../amend-password/amend-password";
import {StorageServiceProvider} from "../../providers/storage-service/storage-service";
import {LoginPage} from "../login/login";
import {User} from "../../model/user";
import {UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the MenusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menus',
  templateUrl: 'menus.html',
})
export class MenusPage {

  @ViewChild(Nav) nav: Nav;

  private user:User=new User();
  private rootPage: any=HomePage;
  private pages: Array<{title: string, component: any}>;


  constructor(public app :App,
              public navCtrl: NavController,
              public navParams: NavParams,
              public storageService :StorageServiceProvider,
              public userService:UserServiceProvider) {
    this.user=this.userService.user;
    this.pages = [
      { title: '用户基本信息', component: InfoPage },
      { title: '用户密码修改', component: AmendPasswordPage }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenusPage');
  }
  ionViewWillEnter(){
    //console.log('每次进入时候调用');
    this.user=this.userService.user;
  }

  //打开一个页面
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page.component);
  }

  //退出
  exit(){
    this.storageService.remove("userLocal");
    this.storageService.clear();
    this.app.getRootNav().setRoot(LoginPage);
  }

}
