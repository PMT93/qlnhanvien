import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../../../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../../../commom/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from '../../../../models/todo.model';
import { TodoService } from '../../../../services/todo.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  // Khởi tạo danh sách nhân viên - bên tay trái
  listEmployee: Employee[] = [];

  // Khởi tạo Nhân viên để thêm sửa -  bên tay phải
  selectedEmployee = new Employee();

  textSearch = '';

  // Ds công việc
  todoList: Todo[] = [];

  salary = {
    NHAN_VIEN: 25000,
    QUAN_LY: 35000,
  };

  constructor(
    private employeeService: EmployeeService,
    private toast: ToastrService,
    private todoService: TodoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(text?: string) {
    if (!text) {
      this.textSearch = '';
    }

    // Lấy ds nhân viên từ localstorage - ListEmployee
    this.listEmployee = this.employeeService
      .loadEmployees()
      .filter((e) =>
        e.name?.toUpperCase()?.includes(text?.toUpperCase() ?? '') || e.code?.toUpperCase()?.includes(text?.toUpperCase() ?? '')
      );

    // Lấy danh sách công việc
    this.todoList = this.todoService.todos;
  }

  // Click chỉnh sửa
  editEmployee(employee: Employee) {
    this.selectedEmployee = { ...employee };
  }

  // Khi click xóa
  deleteEmployee(employee: Employee) {
    // Mở popup
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Xóa nhân viên',
        content: 'Bạn có muốn xóa nhân viên này không?',
      },
      width: '450px',
      maxHeight: '400px',
      disableClose: true,
    });

    // Kiểm tra công việc => nếu vẫn được giao việc thì k được xóa
    const todo = this.todoList.find((e) => e.assignee === employee.code);

    // sau khi đóng popup => lấy công việc thêm vào localstorage
    dialogRef.afterClosed().subscribe((response) => {
      if (response.action === 'cancel') {
        return;
      }

      if (todo) {
        this.toast.error('Nhân viên này vẫn còn việc để giao, không được xóa');
        return;
      }

      // Khi click đồng ý => xóa nhân viên trong ListEmployee ở localstorage
      const checkDeleted = this.employeeService.delete(employee);
      if (checkDeleted) {
        this.toast.success('Xóa thành công');
        this.load();
      } else {
        this.toast.error('Không tìm thấy nhân viên để xóa');
      }
    });
  }

  // Khi nhấn lưu
  onSubmit(frm: NgForm) {
    if (frm.valid) {
      const action = this.selectedEmployee?.code ? 'update' : 'add';
      // Cập nhật thông tin ListEmployee trong localstorage
      this.employeeService.save(this.selectedEmployee, action);

      this.toast.success(
        action === 'update' ? 'Cập nhật thành công' : 'Thêm mới thành công'
      );
      this.selectedEmployee = new Employee();

      this.load();
    } else {
      this.toast.error('Vui lòng điền đầy đủ thông tin');
    }
  }

  positionChange(position: 'NHAN_VIEN' | 'QUAN_LY') {
    this.selectedEmployee.salary = this.salary[position];
  }
}
