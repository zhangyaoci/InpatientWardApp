import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';



/*画图模块*/
import { ChartsModule } from 'ng2-charts';

/*httpClient模块*/
import { HttpClientModule } from '@angular/common/http';

/*组件模块*/
import { ComponentsModule } from '../components/components.module';


/*根组件*/
import { MyApp } from './app.component';
/*页面*/
import { TabsPage } from '../pages/tabs/tabs';
import { MenusPage} from "../pages/menus/menus";
import { InfoPage} from "../pages/info/info"
import { HomePage } from '../pages/home/home';
import { PatientsPage } from '../pages/patients/patients';
import { NewsPage } from '../pages/news/news';
import { LoginPage} from "../pages/login/login";
import { AmendPasswordPage} from "../pages/amend-password/amend-password";
import { RegisterPage} from "../pages/register/register";
import { PatientInfoPage} from "../pages/patient-info/patient-info";
import { NurseInfoPage} from "../pages/nurse-info/nurse-info";
import { DoctorInfoPage} from "../pages/doctor-info/doctor-info";
import { BgPage} from "../pages/bg/bg";
import { BogPage} from "../pages/bog/bog";
import { BpPage} from "../pages/bp/bp";
import { HrPage} from "../pages/hr/hr";
import { TemPage} from "../pages/tem/tem";
import { NewInfoPage} from "../pages/new-info/new-info";



/*http数据请求服务*/
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { PatientServiceProvider } from '../providers/patient-service/patient-service';
import { InformationServiceProvider } from '../providers/information-service/information-service';



@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    PatientsPage,
    NewsPage,
    MenusPage,
    HomePage,
    InfoPage,
    LoginPage,
    AmendPasswordPage,
    RegisterPage,
    PatientInfoPage,
    NurseInfoPage,
    DoctorInfoPage,
    BpPage,
    BgPage,
    BogPage,
    HrPage,
    TemPage,
    NewInfoPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    ChartsModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true', /*隐藏全部子页面 tabs*/
      backButtonText: '返回' /*配置返回按钮*/
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    PatientsPage,
    NewsPage,
    MenusPage,
    HomePage,
    InfoPage,
    LoginPage,
    AmendPasswordPage,
    RegisterPage,
    PatientInfoPage,
    NurseInfoPage,
    DoctorInfoPage,
    BpPage,
    BgPage,
    BogPage,
    HrPage,
    TemPage,
    NewInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServiceProvider,
    StorageServiceProvider,
    UserServiceProvider,
    PatientServiceProvider,
    InformationServiceProvider
  ]
})
export class AppModule {}
