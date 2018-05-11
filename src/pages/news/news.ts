import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {InformationServiceProvider} from "../../providers/information-service/information-service";
import {NewInfoPage} from "../new-info/new-info";
/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage{

  /*保存当前的消息*/
  private informations=new Array();
  public  informationOption="sysInfo";

  private systemInformations=new Array();
  private doctorInformaions =new Array();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public informationService:InformationServiceProvider) {
    this.informations = this.informationService.informations;
    for(let information of this.informations){

      /*改变时间的显示格式*/
      information["time"] = this.timeDifferenceForNow(information["time"])
      information["isRead"]=0;

      if(information["doctor"]==null){
        this.systemInformations.push(information);
      }
      else {
        this.doctorInformaions.push(information);
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }



  /*字符串时间格式，返回与当前时间的差值*/
  public timeDifferenceForNow(time:any){
    let timeOfNow = new Date();
    let timeOfInformation = new Date(time);

    //console.log("时间格式化",timeOfInformation);

   // console.log("时间差",Math.abs(timeOfNow.getTime()-timeOfInformation.getTime()));

    let timeDifference = Math.abs(timeOfNow.getTime()-timeOfInformation.getTime());
    let difference:any ;

    if(timeDifference/60000<1){
      difference = "刚刚";
    }
    else if(timeDifference/60000>=1&& timeDifference/60000<60){
      difference = Math.ceil(timeDifference/60000)+"分钟";
    }
    else if(timeDifference/3600000>=1&&timeDifference/3600000<24){
      difference = Math.ceil(timeDifference/3600000)+"小时";
    }
    else if(timeDifference/(3600000*24)>=1&& timeDifference/(3600000*24)<365){
      difference = Math.ceil(timeDifference/(3600000*24))+"天";
    }
    else {
      difference = Math.ceil(timeDifference/(3600000*24*365))+"年";
    }

    return difference;

  }


  /*跳转到消息的具体页面,消息是否已读*/
  public readingSysInfo(information:any){
    if(information["isRead"]==0){
      this.informationService.updateReadingState(
        this.informationService.userId,information["informationId"],data=>{
          if(data.hasOwnProperty("success")){
            information["isRead"]=1;
            this.navCtrl.push(NewInfoPage,information);
          }
          console.log(data["errror"]);
        });
    }
    else {
      this.navCtrl.push(NewInfoPage,information);
    }
  }

}
