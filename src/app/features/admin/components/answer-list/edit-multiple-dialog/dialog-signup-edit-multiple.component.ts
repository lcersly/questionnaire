import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {SignupFull, Status} from "../../../../../models/signup.model";
import {ThemePalette} from "@angular/material/core";
import {SignupService} from "../../../signup.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-signup-edit-multiple.component.html',
  styleUrls: ['./dialog-signup-edit-multiple.component.scss'],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  standalone: true
})
export class DialogSignupEditMultipleComponent {
  deleteColor: ThemePalette = "primary";

  constructor(
    public dialogRef: MatDialogRef<DialogSignupEditMultipleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSignupEditMultipleData,
    private signupService: SignupService
  ) {
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  deleteClick() {
    if (this.deleteColor === 'primary') {
      this.deleteColor = "warn";
    } else {
      this.signupService.deleteMultiple(this.data.links).subscribe(() => this.dialogRef.close())
    }
  }

  setStatus(status: Status) {
    this.signupService.setStatusMultiple(this.data.links, status).subscribe(() => this.dialogRef.close());
  }
}

export interface DialogSignupEditMultipleData {
  links: SignupFull[];
}
