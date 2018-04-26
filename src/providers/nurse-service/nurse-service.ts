import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the NurseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NurseServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NurseServiceProvider Provider');
  }

}
