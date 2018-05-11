import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {PatientServiceProvider} from "../../providers/patient-service/patient-service";
import {PhysiologyServiceProvider} from "../../providers/physiology-service/physiology-service";

import Highcharts from "highcharts";

/**
 * Generated class for the BpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bp',
  templateUrl: 'bp.html',
})
export class BpPage{



  @ViewChild('chartBar') chartBar: ElementRef;

  private patients:any;
  /*控制当前按钮的颜色*/
  public btnStyle:string[]=new Array(1);
  /*当前点击的按钮是那个*/
  public btnIsVisited:number;
  /*默认展示曲线图*/
  public chooseType:String='curve';
  /*后台返回的血压数据*/
  public  bloodPressures= new Array();
  /*时间标签*/
  public timeLabel= new Array();
  /*血压值中的具体数据*/
  public bloodPressureValues = new Array();



  /*测试阶段用用户ID号为72*/
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserServiceProvider,
              public patientService:PatientServiceProvider,
              public physiologyService:PhysiologyServiceProvider) {

    /*首先获取当前用户关注的病人*/
    this.patientService.getPatientsByUserId(72,data=>{
      if(data.hasOwnProperty("success")){
        this.patients = data["success"];
        this.btnStyle=new Array(this.patients.length);
        /*默认是访问第一个数据*/
        this.btnStyle[0]="btn_visited";
        this.btnIsVisited=0;
        /*病人的基本数据传递过来之后，显示第一病人今天的数据*/
        this.getBloodPressureDataOfToday(this.patients[0]["patientId"]);
        //console.log("获取当前用户关注病人信息",this.patients);
      }
      else{
        console.log("获取当前用户关注病人信息失败");
      }
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BpPage');
  }

  /*获取点击病人的生理数据*/
  public getPatientInfo(num:number){
   this.btnStyle[num]="btn_visited";
   this.btnStyle[this.btnIsVisited]="";
   this.btnIsVisited=num;
   // console.log("当前状态", this.btnStyle);
  }

  /*改变选中的条件*/
  public changeChooseType(type:string) {
    this.chooseType=type;
  }

  /*获取当天的的血压数值，根据病人的Id号*/
  public getBloodPressureDataOfToday(patientId:number){
    let startTime =new Date();
    startTime.setMilliseconds(0);
    startTime.setSeconds(0);
    startTime.setMinutes(0);
    startTime.setHours(0);
    //console.log("当前的天的年月日",startTime);
    let endTime = new Date(startTime.getTime()+1000*60*60*24);
    //console.log("这一天的后一天",endTime);
    this.physiologyService.getBloodPressureData(patientId,startTime,endTime,data=>{
        if(data.hasOwnProperty("success")){
          this.bloodPressures=data["success"];
          this.mapBloodPressures();
        }
        else{
          console.log(data["error"]);
        }
    });
  }


  /*血压数据中的遍历*/
  mapBloodPressures(){
    for(let bloodPressure of this.bloodPressures){
      let dateTime = new Date(bloodPressure["time"]);

      this.timeLabel.push(bloodPressure["time"]);
      this.bloodPressureValues.push(bloodPressure["value"]);
    }
    console.log("timeLabel",this.timeLabel);
    console.log("bloodPressureValues",this.bloodPressureValues);
    this.drawGraph();
  }


  //图形显示
  drawGraph(): void {
    var chart = Highcharts.chart('container', {
      title: {
        text: '病人的血压值'
      },
      xAxis:{
        title:{
          text:'时间'
        },
        enabled:false,
        labels: {    //刻度居中显示
          align: 'center'
        },
        categories:this.timeLabel, //对数据进行分类
        crosshair: {  //点击显示十字线格子
          width: 1,
          color: 'green'
        }
      },
      yAxis: {
        title: {
          align: 'high',
          offset: -60,
          text: '血压值 (mm Hg)',
          rotation: 10,
          y: -20
        },
        plotLines:[{
          color:'red',           //线的颜色，定义为红色
          dashStyle:'solid',     //默认值，这里定义为实线
          value:120,               //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
          width:1                //标示线的宽度，2px
        }],
        min:0,
        allowDecimals:true,
        alternateGridColor: '#FDFFD5',
        crosshair: {
          width: 1,
          color: 'green'
        },
        tickAmount: 6
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      series: [{
        name: '某个时间段血压',
        data: this.bloodPressureValues
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });
  }
}
