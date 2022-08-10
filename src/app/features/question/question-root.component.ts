import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationService} from "../../services/navigation.service";
import {QuestionService} from "../../services/question.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-static-root',
  templateUrl: 'question-root.component.html',
  styleUrls: ['question-root.component.scss']
})
export class QuestionRootComponent implements OnInit {
  isProduction = environment.production;
  correctAnswer: number[] | undefined;

  constructor(private route: ActivatedRoute,
              private navService: NavigationService,
              private questionService: QuestionService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.questionService.setQuestionnaireLength(4);

    if (!this.isProduction) {
      this.questionService.currentQuestion$.subscribe(question => {
        if (question?.options) {
          this.correctAnswer = question.options.correctIndex.map(value => value + 1)
        } else {
          this.correctAnswer = undefined;
        }
      })
    }
  }

  startOver() {
    this.questionService.resetQuestionnaire();
    this.router.navigate(['/']);
  }

}
