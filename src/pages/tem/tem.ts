import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import {PhysiologyServiceProvider} from "../../providers/physiology-service/physiology-service";
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {PatientServiceProvider} from "../../providers/patient-service/patient-service";

import Highcharts from "highcharts";
import HighchartsNoData from 'highcharts-no-data-to-display';
/**
 * Generated class for the TemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tem',
  templateUrl: 'tem.html',
})
export class TemPage {

  private patients:any;
  /*控制当前按钮的颜色*/
  private btnStyle:string[]=new Array(1);
  /*当前点击的按钮是那个*/
  private btnIsVisited:number;
  /*默认展示曲线图*/
  private chooseType:String='curve';
  /*开始时间*/
  private inputStartTime:any;
  /*结束时间*/
  private inputEndTime :any;
  /*开始时间参数*/
  private startTime:Date;
  /*结束时间参数*/
  private endTime :Date;


  /*病人ID 、 体温值*/
  private temperatureList = new Array();




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
        this.acquireTemperatureData(this.patients[0]["patientId"]);
      }
      else{
        console.log("获取当前用户关注病人信息失败");
      }
    });

  }


  /*获取病人的体温值*/
  private acquireTemperatureData(patientId:number){
      /*获取时间框中的时间*/
      this.InputTimeTransmitTime();
      this.physiologyService.getTemperatureData(patientId,this.startTime,this.endTime,
          data=>{
            if(data.hasOwnProperty("success")){
              this.temperatureList = data["success"];
              console.log("体温值",this.temperatureList);
              /*每次取到新数据重新画图*/
              this.drawGraph();
            }
            else{
              console.log("错误信息",data["error"]);
            }
      });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad TemPage');
  }
  /*当前选中的病人*/
  public getPatientInfo(num:number){
    this.btnStyle[num]="btn_visited";
    this.btnStyle[this.btnIsVisited]="";
    this.btnIsVisited=num;
    this.acquireTemperatureData(this.patients[num]["patientId"]);
  }

  /*改变选中的条件(曲线、统计、列表)*/
  public changeChooseType(type:string) {
    this.chooseType=type;
    this.acquireTemperatureData(this.patients[this.btnIsVisited]["patientId"]);
  }

  /*初始化时间选择框*/
  public initialTimeInput(){
    /*getMonth 返回值是从0 到 11*/
    let _startTime =new Date();
    let _startTimeMonth= _startTime.getMonth()+1>=1&&_startTime.getMonth()+1<=9?0+""+(_startTime.getMonth()+1):_startTime.getMonth()+1;
    let _startTimeDay =  _startTime.getDate()>=1&&_startTime.getDate()<=9?0+""+_startTime.getDate():_startTime.getDate();
    this.inputStartTime=_startTime.getFullYear()+"-"+_startTimeMonth+"-"+_startTimeDay;
    _startTime.setMilliseconds(0);
    _startTime.setSeconds(0);
    _startTime.setMinutes(0);
    _startTime.setHours(0);
    let _endTime = new Date(_startTime.getTime()+1000*60*60*24);
    let _endTimeMonth = _endTime.getMonth()>=1+1&&_endTime.getMonth()+1<=9?0+""+(_endTime.getMonth()+1):_endTime.getMonth()+1;
    let _endTimeDay =  _endTime.getDate()>=1&&_endTime.getDate()<=9?0+""+_endTime.getDate():_endTime.getDate();
    this.inputEndTime=_endTime.getFullYear()+"-"+_endTimeMonth+"-"+_endTimeDay;
  }

  /*获取时间框中的值并且赋值给参数开始时间和结束时间*/
  public InputTimeTransmitTime(){
    this.startTime=new Date(this.inputStartTime);
    this.startTime.setHours(0);
    this.endTime = new Date(this.inputEndTime);
    this.endTime.setHours(0);
  }


  /*画图*/
  private drawGraph(){

    let values = new Array();
    let times = new Array();
    for(let temperature of this.temperatureList){
      let time = temperature["time"].split("T")
      values.push(temperature["value"]);
      times.push(time[0]+" "+time[1]);
    }

    HighchartsNoData(Highcharts);
    Highcharts.setOptions({
      lang: {
        noData: '暂无数据'
      }
    });

    let chart = Highcharts.chart('container', {
      title: {
        text: '某段时间血压值'
      },
      yAxis: {
        title: {
          align: 'high',
          offset: -60,
          text: '体温值 (℃)',
          rotation: 10,
          y: -20
        },
        plotLines:[{
          color:'#FF0000',           //线的颜色，定义为红色
          dashStyle:'solid',     //默认值，这里定义为实线
          value:37,               //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
          width:2                //标示线的宽度，2px
        }]
      },
      xAxis:{
        categories:times,
        gridLineWidth:1
      },
      series: [{
        type: 'line',
        name: '体温值',
        data: values
      }],
      noData: {
        style: {
          fontWeight: 'bold',
          fontSize: '15px',
          color: '#303030'
        }
      }
    });
  }
}
