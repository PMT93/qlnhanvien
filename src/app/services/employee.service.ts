import {Injectable} from '@angular/core';
import {Employee} from '../models/employee.model';

const LIST_EMPLOYEE = 'ListEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  listEmployee: Employee [] = [];

  constructor() {
    this.loadEmployees();
  }

  loadEmployees(): Employee[] {
    this.listEmployee = this.loadLocal(LIST_EMPLOYEE) ?? [];
    return this.listEmployee;
  }

  save(employee: Employee, action: 'add' | 'update') {
    if (action === 'update') {

      this.listEmployee = this.listEmployee.map(e => {
        if (e.code == employee.code) {
          return {...employee, code: e.code} as Employee;
        }
        return e;
      });

      this.saveLocal(this.listEmployee, LIST_EMPLOYEE);

    } else {

      employee.code = '' + Date.now();
      this.listEmployee.push(employee);
      this.saveLocal(this.listEmployee, LIST_EMPLOYEE);

    }
  }

  delete(employee: Employee): boolean {
    let i = this.listEmployee.findIndex(e => e.code == employee.code);
    if (i < 0) {
      return false
    }

    this.listEmployee.splice(i, 1);
    this.saveLocal(this.listEmployee, LIST_EMPLOYEE);

    return true;
  }

  saveLocal(data: any, key: string) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  loadLocal(key: string) {
    let str = localStorage.getItem(key);
    if (str && str != "") {
      return JSON.parse(str);
    } else {
      return null;
    }
  }

}
