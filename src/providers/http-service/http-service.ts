import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import {_throw} from "rxjs/observable/throw";
import {catchError} from "rxjs/operators";

@Injectable()
export class HttpServiceProvider {

  /*参数头配置*/
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


  /*post请求返回一个observable对象*/
  public postSerializationObservable(urlMethod,data):Observable<object>{
    return this.http.post( 'inpatientWardAppServer' + urlMethod + '',data, this.httpOptions);
  }


  /*处理错误请求*/
  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return _throw('Something bad happened; please try again later.');
  };

  /*参数序列化*/
  private toQueryPair(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }
}
