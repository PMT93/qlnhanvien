import {Component, OnInit} from '@angular/core';
import {Employee} from 'src/app/models/employee.model';
import {EmployeeService} from "../../../../services/employee.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {PopupDivisionDialog} from "./popup-divison/popup-division.component";
import {Todo} from "../../../../models/todo.model";
import {TodoService} from "../../../../services/todo.service";
import {ConfirmDialogComponent} from "../../../../commom/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-division-work',
  templateUrl: './division-work.component.html',
  styleUrls: ['./division-work.component.scss']
})
export class DivisionWorkComponent implements OnInit {

  todoList: Todo [] = [];

  listEmployee: Employee[] = [];

  textSearch = '';

  constructor(private employeeService: EmployeeService,
              private todoService: TodoService,
              private toast: ToastrService,
              public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.load();
  }

  load(text?: string) {
    if (!text) {
      this.textSearch = '';
    }

    // Lấy ds nhân viên từ localstorage - ListEmployee
    this.listEmployee = this.employeeService.loadEmployees();

    // Lấy danh sách công việc
    this.todoList = this.todoService.todos.map(t => {
      const employee = this.listEmployee.find(e => e.code === t.assignee) ?? new Employee();
      return {...t, assigneeName: employee.name}
    }).filter(e => e.title?.toUpperCase()?.includes(text?.toUpperCase() ?? '') || e.assigneeName?.toUpperCase()?.includes(text?.toUpperCase() ?? ''));
  }

  // Click chỉnh sửa
  save(todo?: Todo) {
    // Mở popup
    const dialogRef = this.dialog.open(PopupDivisionDialog, {
      data: {employees: this.listEmployee, todo: !!todo ? {...todo} : null},
      width: '750px',
      maxHeight: '95%',
      disableClose: true
    });

    // sau khi đóng popup => lấy công việc thêm vào localstorage
    dialogRef.afterClosed().subscribe(t => {
      if (!!t) {
        this.todoService.save(t);
        this.toast.success("Sửa công việc thành công");
        this.load();
      }
    });
  }

  // Khi click xóa
  delete(todo: Todo) {
    // Mở popup
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {title: 'Xóa công việc', content: 'Bạn có muốn xóa công việc này không?'},
      width: '450px',
      maxHeight: '400px',
      disableClose: true
    });

    // sau khi đóng popup => lấy công việc thêm vào localstorage
    dialogRef.afterClosed().subscribe(response => {
      if (response.action === 'cancel') {
        return
      }

      const check = this.todoService.remove(todo);

      if (check) {
        this.toast.success("Xóa công việc thành công");
        this.load();
      } else {
        this.toast.error('Không tìm thấy công việc này để xóa')
      }
    });
  }
  //Click thay đổi trạng thái công việc
  changeTodo(todo: Todo) {
    todo.status = todo.status === 'complete' ? 'unfinished' : 'complete';
    this.todoService.save(todo);

    if (todo.status === 'complete') {
      this.toast.success('Đã hoàn thành công việc');
    }
  }
}
