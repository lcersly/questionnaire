import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../../../services/question.service";
import {combineLatest, map, of} from "rxjs";

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
          return 100;
        }


        return 100 * index! / answers.length
      })
    )
  }

}
