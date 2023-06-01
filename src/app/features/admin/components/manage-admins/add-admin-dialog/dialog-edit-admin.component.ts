import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SignupFull} from "../../../../../models/signup.model";
import {Admin, AdminService} from "../../../admin.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-admin-edit',
  templateUrl: './dialog-edit-admin.component.html',
  styleUrls: ['./dialog-edit-admin.component.scss'],
})
export class DialogEditAdminComponent {

  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
  })

  constructor(
    public dialogRef: MatDialogRef<DialogEditAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogAddAdminData,
    private adminService: AdminService
  ) {
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  addAdmin() {
    if (!this.form.valid) {
      return
    }

    this.adminService.addAdmin(this.form.value as Admin).subscribe(() => this.dialogRef.close());
  }

  get nameControl() {
    return this.form.get('name') as FormControl
  }

  get uidControl() {
    return this.form.get('uid') as FormControl
  }
}

export interface DialogAddAdminData {
  links: SignupFull[];
}
