import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageServiceProvider {


  /*本地存储信息*/


  constructor(public http: HttpClient) {
    console.log('Hello StorageServiceProvider Provider');
  }

  public write(key: string, value: any) {
    if (value) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  public read<T>(key: string): T {
    let value: string = localStorage.getItem(key);

    if (value && value != "undefined" && value != "null") {
      return <T>JSON.parse(value);
    }
    return null;
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public clear() {
    sessionStorage.clear();
  }

}
