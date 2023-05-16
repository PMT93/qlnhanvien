import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoRoutingModule} from './todo-routing.module';
import {TodoComponent} from './todo/todo.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ReportComponent} from './pages/report/report.component';
import {FormsModule} from '@angular/forms';
import {EmployeeComponent} from "./pages/employee/employee.component";
import {DivisionWorkComponent} from "./pages/division-work/division-work.component";
import {PopupDivisionDialog} from "./pages/division-work/popup-divison/popup-division.component";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {OverlayContainer} from "ngx-toastr";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {BarChartModule} from "@swimlane/ngx-charts";
import {AboutUsComponent} from "./pages/about-us/about-us.component";


@NgModule({
  declarations: [
    TodoComponent,
    DashboardComponent,
    ReportComponent,
    EmployeeComponent,
    DivisionWorkComponent,
    PopupDivisionDialog,
    AboutUsComponent
  ],
  entryComponents: [PopupDivisionDialog],
    imports: [
        CommonModule,
        TodoRoutingModule,
        FormsModule,
        MatSelectModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        BarChartModule,
    ],
  providers: [
    {provide: OverlayContainer},
  ],
})
export class TodoModule {
}
