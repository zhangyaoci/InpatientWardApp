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
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  //访问的服务器路径
  httpURL="http://127.0.0.1:8080/inpatientWardAppServer";

  constructor(public http: HttpClient) {
    console.log('Hello HttpServiceProvider Provider');
  }


  //post请求返回一个Promise对象
  postSerialization(urlMethod,data) {

    console.log("请求数据");

    return new Promise((resolve, reject) => {
      this.http.post('' + this.httpURL + '' + urlMethod + '', {'user':data}, this.httpOptions)
        .subscribe(data => resolve(data), err => reject(err))
    })
  }


  //post请求返回一个Observable对象
  postSerializationSubscribe(urlMethod,data) {



    return this.http.post('' + this.httpURL + '' + urlMethod + '', this.toQueryString(data), this.httpOptions);
  }

  //请求参数序列化
  private toQueryString(obj) {
    let result = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        result = result.concat(queryValues);
      } else {
        result.push(this.toQueryPair(key, values));
      }
    }
    return result.join('&');
  }


  //参数序列化
  private toQueryPair(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }
}
