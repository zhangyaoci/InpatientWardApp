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
export class NewsPage{


  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }



}
