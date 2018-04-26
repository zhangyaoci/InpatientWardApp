import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import Chart from 'chart.js';
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
export class NewsPage implements AfterViewInit{

  @ViewChild('chartBar') chartBar: ElementRef;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menu: MenuController) {
    menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
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


}
