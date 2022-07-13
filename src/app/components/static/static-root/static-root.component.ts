import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../../services/question.service";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-static-root',
  templateUrl: './static-root.component.html',
  styleUrls: ['./static-root.component.scss']
})
export class StaticRootComponent implements OnInit {
  isProduction = environment.production;
  correctAnswer: number[] | undefined;

  constructor(public questionService: QuestionService, private router: Router) {
  }

  ngOnInit(): void {
    this.questionService.setQuestionnaireLength(4);

    this.questionService.currentQuestionOptions$.subscribe(options => {
      if (options) {
        this.correctAnswer = options.correctIndex.map(value => value + 1)
      } else {
        this.correctAnswer = undefined;
      }
    })
  }

  startOver() {
    this.questionService.resetQuestionnaire();
    this.router.navigate(['/']);
  }

}
