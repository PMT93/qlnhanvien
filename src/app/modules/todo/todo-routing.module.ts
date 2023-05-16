import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ReportComponent} from './pages/report/report.component';
import {TodoComponent} from './todo/todo.component';
import {EmployeeComponent} from "./pages/employee/employee.component";
import {DivisionWorkComponent} from "./pages/division-work/division-work.component";
import {AboutUsComponent} from "./pages/about-us/about-us.component";

const routes: Routes = [
  {
    path:"",
    component:TodoComponent,
    children :[
      {
        path:"",
        redirectTo:"dashboard",
        pathMatch:"full",
      },
      {
        path:"dashboard",
        component:DashboardComponent
      },
      {
        path: 'employee',
        component: EmployeeComponent
      },
      {
        path:"division",
        component:DivisionWorkComponent
      },
      {
        path:"report",
        component:ReportComponent
      },
      {
        path:"about",
        component:AboutUsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
