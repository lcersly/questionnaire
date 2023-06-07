import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-quiz-pick.component.html',
  styleUrls: ['./dialog-quiz-pick.component.scss'],
  imports: [
    MatDialogModule,
    MatButtonModule,
    NgForOf
  ],
  standalone: true
})
export class DialogQuizPickComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogQuizPickComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogQuizPickComponentData,
  ) {
  }

  cancelClick(): void {
    this.dialogRef.close({selected: false} as DialogQuizPickComponentResult);
  }

  pickQuiz(quizId?: string) {
    this.dialogRef.close({selected: true, quizId: quizId} as DialogQuizPickComponentResult);
  }
}

export interface DialogQuizPickComponentData {
  quizIds: string[];
}

export interface DialogQuizPickComponentResult {
  selected: boolean,
  quizId?: string
}
