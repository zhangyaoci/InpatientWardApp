import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {InformationServiceProvider} from "../information-service/information-service";
import {UserServiceProvider} from "../user-service/user-service";

/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageServiceProvider {


  /*本地存储信息 不能循环引用*/
  constructor() {
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

  /*在用户修改密码 、注册用户、退出 先要把当前用户所对应的消息都视为没有没有被拉取状态*/
  public clear() {
    localStorage.clear();
  }

}
