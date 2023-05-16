import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {Todo} from "../../../../../models/todo.model";
import {Employee} from "../../../../../models/employee.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-popup-division',
  styleUrls: ['popup-division.component.scss'],
  templateUrl: 'popup-division.component.html',
})
export class PopupDivisionDialog {
  todo: Todo;
  employees: Employee[] = [];

  constructor(
    public dialogRef: MatDialogRef<PopupDivisionDialog>,
    private toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.employees = data.employees;
    this.todo = data?.todo ?? new Todo();
  }

  onSubmit(frm: NgForm): void {

    console.log(frm);
    if (!frm.valid || !this.todo.assignee || !this.todo.startTime) {
      this.toast.error("Vui lòng điền đầy đủ thông tin");
      return
    }

    this.dialogRef.close(this.todo);
  }
}
