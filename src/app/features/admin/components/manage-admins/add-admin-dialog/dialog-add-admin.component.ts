import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SignupFull} from "../../../../../models/signup.model";
import {Admin, AdminService} from "../../../admin.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-add-admin.component.html',
  styleUrls: ['./dialog-add-admin.component.scss'],
})
export class DialogAddAdminComponent {

  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    uid: new FormControl('', Validators.required),
  })

  constructor(
    public dialogRef: MatDialogRef<DialogAddAdminComponent>,
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

    this.adminService.addAdmin(this.form.value as Admin);
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
