import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

import 'rxjs/add/operator/map';


@Injectable()
export class HttpServiceProvider {

  //参数头配置
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

 /* //访问的服务器路径
  httpURL="http://localhost:8080/inpatientWardAppServer";*/

  constructor(public http: HttpClient) {
    console.log('Hello HttpServiceProvider Provider');
  }


  //post请求返回一个Promise对象
  public postSerializationPromise(urlMethod,data):Promise<object>{
    return new Promise((resolve, reject) => {
      this.http.post( 'inpatientWardAppServer' + urlMethod + '',data, this.httpOptions)
        .subscribe(data => resolve(data), err => reject(err));
    })
  }


  //参数序列化
  private toQueryPair(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }
}
