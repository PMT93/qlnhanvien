import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface ConfirmModel {
  title: string;
  content: string;
}

export interface ConfirmResult {
  action: 'cancel' | 'agree';
}

@Component({
  selector: 'app-popup-division',
  styleUrls: ['confirm-dialog.component.scss'],
  templateUrl: 'confirm-dialog.component.html',
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmModel,
  ) {}

  onSubmit(): void {
    this.dialogRef.close({action: 'agree'} as ConfirmResult);
  }

}
