import {AfterViewInit, Component, ElementRef, ForwardRefFn, OnInit, ViewChild} from '@angular/core';
import {App, MenuController, ModalController, NavController} from 'ionic-angular';
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


  constructor(public app :App,
              public navCtrl: NavController,
              public modalCtrl: ModalController,
              public elementRef: ElementRef,
              public menu: MenuController) {
     menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  toBG(){
    this.app.getRootNav().push(BgPage);
    /*this.navCtrl.push(BgPage);*/
  }
  toBOG(){
    this.app.getRootNav().push(BogPage);
    /*this.navCtrl.push(BogPage);*/
  }
  toBP(){
    this.app.getRootNav().push(BpPage);
   /* this.navCtrl.push(BpPage);*/
  }
  toHR(){
    this.app.getRootNav().push(HrPage);
    /*this.navCtrl.push(HrPage);*/
  }
  toTem(){
    this.app.getRootNav().push(TemPage);
   /* this.navCtrl.push(TemPage);*/
  }
}
