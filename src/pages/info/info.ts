import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../model/user";
import {StorageServiceProvider} from "../../providers/storage-service/storage-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage implements OnInit{

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storageService:StorageServiceProvider,
              public userService:UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }



  public user:User=new User();
  public  massage:any;

  //初始化返回数据
  ngOnInit(): void {
      if(this.userService.user!=null){
        this.user=this.userService.user;
      }else{
        this.userService.getUserByPhone(this.storageService.read("userLocal")["phone"],data=>{
          if(data.hasOwnProperty("phone")){
            this.user=data;
          }else {
            this.massage=data;
          }});
      }
  }

  //修改用户基础信息
  editUser(){
     this.userService.updateUser(this.user,data=>{
          if(data=="用户修改信息成功"){
            //保持在userService storagerService的数据更新
            this.userService.user=this.user;
            this.storageService.write("userLocal",this.user);
          }
          else{
            this.massage=data;
          }
     });
  }

  //返回
  back_to(){
    this.navCtrl.pop();
  }


}
