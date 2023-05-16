import {Component, OnInit} from '@angular/core';
import {Employee} from "../../../../models/employee.model";
import {EmployeeService} from "../../../../services/employee.service";
import {Color} from "@swimlane/ngx-charts";
import {Todo} from "../../../../models/todo.model";
import {TodoService} from "../../../../services/todo.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  dataChart: any = [];

  view: [number, number] = [700, 400];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Nhân viên';
  showYAxisLabel = true;
  yAxisLabel = 'Tiền lương';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  } as Color;

  employees: Employee[] = [];
  todos: Todo[] = [];

  constructor(private employeeService: EmployeeService,
              private todoService: TodoService) {

  }

  ngOnInit(): void {
    // Lấy ds công việc
    this.todos = this.todoService.todos;

    // Lấy ds nhân viên từ localstorage - ListEmployee
    // Tính số giờ làm việc và lương của nhân viên
    this.employees = this.employeeService.loadEmployees().map(
      employee => {
        const todosOfEmployee = this.todos.filter(todo => todo.assignee === employee.code && todo.status === 'complete');

        // Tính số giờ làm việc trong tất cả công việc đã hoàn thành
        const workingTime = todosOfEmployee.reduce((previousValue, todo) => previousValue + Math.round(todo.time), 0);

        return {
          ...employee,
          workingTime,
        } as Employee;
      }
    );
    //Tính lương
    this.dataChart = this.employees.map(employee => ({
      name: employee.name,
      value: (employee.salary ?? 0) * (employee.workingTime ?? 0)
    }));
  }
}
