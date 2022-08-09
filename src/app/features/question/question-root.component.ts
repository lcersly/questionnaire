import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationService} from "../../services/navigation.service";
import {QuestionService} from "../../services/question.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-static-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <div id="debugOptions" *ngIf="!isProduction">
      <h4>Debug options</h4>
      <button mat-flat-button color="warn" (click)="startOver()">Start over</button>
      <span *ngIf="correctAnswer">The correct answer is {{correctAnswer}}</span>
    </div>
  `,
  styles: [
    `
      #debugOptions {
        position: absolute;
        left: 10px;
        bottom: 10px;

        padding: 10px;
        border: 1px black solid;
      }
    `
  ]
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
