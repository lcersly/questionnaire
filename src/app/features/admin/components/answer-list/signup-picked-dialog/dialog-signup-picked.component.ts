import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SignupFull} from "../../../../../models/signup.model";
import {SignupService} from "../../../signup.service";

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-signup-picked.component.html',
  styleUrls: ['./dialog-signup-picked.component.scss'],
})
export class DialogSignupPickedComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogSignupPickedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSignupPickedData,
    private signupService: SignupService
  ) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  markContacted() {
    this.signupService.setStatus(this.data.signup, 'notified').subscribe(() => this.dialogRef.close())
  }
}

export interface DialogSignupPickedData {
  signup: SignupFull;
}
