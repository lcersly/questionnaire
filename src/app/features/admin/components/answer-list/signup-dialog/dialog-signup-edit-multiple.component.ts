import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SignupFull} from "../../../../../models/signup.model";

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-signup-edit-multiple.component.html',
  styleUrls: ['./dialog-signup-edit-multiple.component.scss'],
})
export class DialogSignupEditMultipleComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogSignupEditMultipleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSignupEditMultipleData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogSignupEditMultipleData {
  links: SignupFull[];
}
