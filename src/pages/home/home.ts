import {AfterViewInit, Component, ElementRef, ForwardRefFn, OnInit, ViewChild} from '@angular/core';
import {MenuController, ModalController, NavController} from 'ionic-angular';

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

}
