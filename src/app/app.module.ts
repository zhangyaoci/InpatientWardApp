import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';



//导入画图模块
import { ChartsModule } from 'ng2-charts';

//引入httpClient模块
import { HttpClientModule } from '@angular/common/http';

//引入组件模块
import { ComponentsModule } from '../components/components.module';


//映入根组件
import { MyApp } from './app.component';


//http数据请求服务
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';


//引入页面
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {AmendPasswordPage} from "../pages/amend-password/amend-password";
import { RegisterPageModule } from "../pages/register/register.module"
import { UserServiceProvider } from '../providers/user-service/user-service';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    AmendPasswordPage

  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    ChartsModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true', //隐藏全部子页面 tabs
      backButtonText: '返回' /*配置返回按钮*/
    }),
    RegisterPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    AmendPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    StorageServiceProvider,
    UserServiceProvider
  ]
})
export class AppModule {}
