import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Chart from 'chart.js';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {PatientServiceProvider} from "../../providers/patient-service/patient-service";
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
export class BpPage implements AfterViewInit{


  @ViewChild('chartBar') chartBar: ElementRef;

  private patients:any;
  /*控制当前按钮的颜色*/
  public btnStyle:string[]=new Array(1);
  /*当前点击的按钮是那个*/
  public btnIsVisited:number;
  /*默认展示曲线图*/
  public chooseType:String='curve';

  /*测试阶段用用户ID号为72*/
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userService: UserServiceProvider,
              public patientService:PatientServiceProvider) {

    /*首先获取当前用户关注的病人*/
    this.patientService.getPatientsByUserId(72,data=>{
      if(data.hasOwnProperty("success")){
        this.patients = data["success"];
        this.btnStyle=new Array(this.patients.length);
        /*默认是访问第一个数据*/
        this.btnStyle[0]="btn_visited";
        this.btnIsVisited=0;
        console.log("获取当前用户关注病人信息",this.patients);
      }
      else{
        console.log("获取当前用户关注病人信息失败");
      }
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BpPage');
  }

  //图形显示
  ngAfterViewInit(): void {
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var config = {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor:  'rgb(54, 162, 235)',
          data: [
            2,
            4,
            6,
            7,
            6,
            4,
            5
          ],
          fill: false,
        }, {
          label: 'My Second dataset',
          fill: false,
          /*backgroundColor: blue,
          borderColor: #0000000,*/
          data: [
            40,
            40,
            60,
            70,
            60,
            40,
            50
          ],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        }
      }
    };

    var myLine = new Chart(this.chartBar.nativeElement.getContext("2d"), config);
  }

  /*获取点击病人的生理数据*/
  public getPatientInfo(num:number){
   this.btnStyle[num]="btn_visited";
   this.btnStyle[this.btnIsVisited]="";
   this.btnIsVisited=num;
    console.log("当前状态", this.btnStyle);
  }

  /*改变选中的条件*/
  public changeChooseType(type:string) {
    this.chooseType=type;
  }
}
