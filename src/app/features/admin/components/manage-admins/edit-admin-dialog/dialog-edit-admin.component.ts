import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {SignupFull} from "../../../../../models/signup.model";
import {Admin, AdminService} from "../../../admin.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-edit-admin.component.html',
  styleUrls: ['./dialog-edit-admin.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class DialogEditAdminComponent {

  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    uid: new FormControl('', Validators.required),
  })

  constructor(
    public dialogRef: MatDialogRef<DialogEditAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogEditAdminData,
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

export interface DialogEditAdminData {
  admin: Admin;
}
