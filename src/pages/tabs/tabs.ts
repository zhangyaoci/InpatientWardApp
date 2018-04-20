import { Component } from '@angular/core';

import { MenusPage} from "../menus/menus";
import { NewsPage } from '../news/news';
import { PatientsPage } from '../patients/patients';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MenusPage;
  tab2Root = NewsPage;
  tab3Root = PatientsPage;
  constructor() {

  }
}
