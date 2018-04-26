import {AfterViewInit, Component, ElementRef, ForwardRefFn, OnInit, ViewChild} from '@angular/core';
import {MenuController, ModalController, NavController} from 'ionic-angular';
import {BgPage} from "../bg/bg";
import {BogPage} from "../bog/bog";
import {BpPage} from "../bp/bp";
import {HrPage} from "../hr/hr";
import {TemPage} from "../tem/tem";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public elementRef: ElementRef,
              public menu: MenuController) {
     menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  toBG(){
    this.navCtrl.push(BgPage);
  }
  toBOG(){
    this.navCtrl.push(BogPage);
  }
  toBP(){
    this.navCtrl.push(BpPage);
  }
  toHR(){
    this.navCtrl.push(HrPage);
  }
  toTem(){
    this.navCtrl.push(TemPage);
  }
}
