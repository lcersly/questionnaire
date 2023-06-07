import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
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
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
  })

  constructor(
    public dialogRef: MatDialogRef<DialogEditAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogEditAdminData,
    private adminService: AdminService
  ) {
    this.nameControl.setValue(data.admin.name)
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  editAdmin() {
    if (!this.form.valid) {
      return
    }

    let newAdminDetails = {
      ...this.data.admin,
      name: this.nameControl.value,
    } as Admin;

    this.adminService.setAdminAndDetails(newAdminDetails).subscribe(() => this.dialogRef.close());
  }
  get nameControl() {
    return this.form.get('name') as FormControl
  }

}

export interface DialogEditAdminData {
  admin: Admin;
}
