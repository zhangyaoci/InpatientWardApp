import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
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
export class InfoPage {

  public user:User=new User();
  public massage:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService:UserServiceProvider,
              public alertController:AlertController) {

    /*进行深度克隆*/
    var proto= Object.getPrototypeOf(this.userService.user);
    this.user= Object.assign({},Object.create(proto),this.userService.user);

    /* this.user = this.userService.user;*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }



  //修改用户基础信息
  editUser(){
     this.userService.updateUser(this.user,data=>{
          if(data.hasOwnProperty("success")){
            this.massage="用户信息修改成功";
          }
          else{
            this.massage=data["error"];
          }
     });
  }


  private getPicture(){
    let alert = this.alertController.create({
      title: '头像选择',
      inputs: [
        {
          name: 'picture',
          type:'radio',
          value:'./assets/imgs/1.png',
          label:"头像1"
        },
        {
          name: 'picture',
          type:'radio',
          value:'./assets/imgs/2.png',
          label:"头像2"
        },
        {
          name: 'picture',
          type:'radio',
          value:'./assets/imgs/3.png',
          label:"头像3"
        },
        {
          name: 'picture',
          type:'radio',
          value:'./assets/imgs/4.png',
          label:"头像4"
        },
        {
          name: 'picture',
          type:'radio',
          value:'./assets/imgs/5.png',
          label:"头像5"
        },
        {
          name: 'picture',
          type:'radio',
          value:'./assets/imgs/6.png',
          label:"头像6"
        },
        {
          name: 'picture',
          type:'radio',
          value:'./assets/imgs/7.png',
          label:"头像7"
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确认',
          handler: data => {
           this.user['picturePath']=data;
          }
        }
      ]
    });
    alert.present();
  }

  //返回
  private back_to(){
    this.navCtrl.pop();
  }


}
