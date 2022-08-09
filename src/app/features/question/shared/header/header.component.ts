import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../../../services/question.service";
import {combineLatest, map, Observable, of} from "rxjs";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private answerService: QuestionService) {
  }

  ngOnInit(): void {
  }

  get showProgressBar() {
    return of(true);
    // return this.answerService.currentQuestion$.pipe(map(question => !!question));
  }

  get progressBarMax() {
    return this.answerService.answers$.pipe(map(answers => answers.length));
  }

  get currentProgress() {
    return combineLatest([
      this.answerService.currentIndex$,
      this.answerService.answers$,
      this.answerService.currentPositionType$
    ]).pipe(
      map(([index, answers, type]) => {
        if (type === 'start') {
          return 0;
        }

        if (type == 'submit') {
          // calculate correct answers %
          const total = this.answerService.totalAnswers();
          if (total != 0) {
            return this.answerService.correctAnswers() * 100 / total
          }
        }

        if (type == 'end') {
          return 100;
        }

        return 100 * index! / answers.length
      })
    )
  }

  get progressColor(): Observable<ThemePalette> {
    return this.answerService.currentPosition$.pipe(map(pos => {
      return pos.name === 'submit' && this.answerService.isAnyAnswerIncorrect() ? 'warn' : 'primary';
    }))
  }

}
