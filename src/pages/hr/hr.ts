import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PhysiologyServiceProvider} from "../../providers/physiology-service/physiology-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {PatientServiceProvider} from "../../providers/patient-service/patient-service";

/**
 * Generated class for the HrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hr',
  templateUrl: 'hr.html',
})
export class HrPage {

  private patients:any;
  /*控制当前按钮的颜色*/
  public btnStyle:string[]=new Array(1);
  /*当前点击的按钮是那个*/
  public btnIsVisited:number;
  /*默认展示曲线图*/
  public chooseType:String='curve';
  /*开始时间*/
  public startTime:any;
  /*结束时间*/
  public endTime :any;


  /*测试阶段用用户ID号为72*/
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserServiceProvider,
              public patientService:PatientServiceProvider,
              public physiologyService:PhysiologyServiceProvider) {

    /*初始化开始时间和结束时间*/
    this.initialTimeInput();

    /*首先获取当前用户关注的病人*/
    this.patientService.getPatientsByUserId(72,data=>{
      if(data.hasOwnProperty("success")){
        this.patients = data["success"];
        this.btnStyle=new Array(this.patients.length);
        /*默认是访问第一个数据*/
        this.btnStyle[0]="btn_visited";
        this.btnIsVisited=0;

      }
      else{
        console.log("获取当前用户关注病人信息失败");
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HRPage');
  }
  /*当前选中的病人*/
  public getPatientInfo(num:number){
    this.btnStyle[num]="btn_visited";
    this.btnStyle[this.btnIsVisited]="";
    this.btnIsVisited=num;
  }

  /*改变选中的条件(曲线、统计、列表)*/
  public changeChooseType(type:string) {
    this.chooseType=type;
  }

  /*初始化时间选择框*/
  public initialTimeInput(){

    /*getMonth 返回值是从0 到 11*/
    let _startTime =new Date();
    let _startTimeMonth= _startTime.getMonth()+1>=1&&_startTime.getMonth()+1<=9?0+""+(_startTime.getMonth()+1):_startTime.getMonth()+1;
    let _startTimeDay =  _startTime.getDate()>=1&&_startTime.getDate()<=9?0+""+_startTime.getDate():_startTime.getDate();
    this.startTime=_startTime.getFullYear()+"-"+_startTimeMonth+"-"+_startTimeDay;
    /*console.log("当前时间",_startTime);
    console.log("当前具体时间",_startTime.getDate());*/
    _startTime.setMilliseconds(0);
    _startTime.setSeconds(0);
    _startTime.setMinutes(0);
    _startTime.setHours(0);
    //console.log("当前的天的年月日",startTime);
    let _endTime = new Date(_startTime.getTime()+1000*60*60*24);
    let _endTimeMonth = _endTime.getMonth()>=1+1&&_endTime.getMonth()+1<=9?0+""+(_endTime.getMonth()+1):_endTime.getMonth()+1;
    let _endTimeDay =  _endTime.getDate()>=1&&_endTime.getDate()<=9?0+""+_endTime.getDate():_endTime.getDate();
    this.endTime=_endTime.getFullYear()+"-"+_endTimeMonth+"-"+_endTimeDay;

  }

  }
