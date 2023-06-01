import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import {NavigationService} from "../../services/navigation.service";
import {QuestionService} from "../../services/question.service";
import {environment} from "../../../environments/environment";
import {QuizService} from "../../services/quiz.service";
import { HeaderComponent } from './shared/header/header.component';

@Component({
    selector: 'app-static-root',
    templateUrl: 'question-root.component.html',
    styleUrls: ['question-root.component.scss'],
    standalone: true,
    imports: [HeaderComponent, RouterOutlet]
})
export class QuestionRootComponent implements OnInit {
  isProduction = environment.production;

  // correctAnswer: number[] | undefined;

  constructor(private route: ActivatedRoute,
              private navService: NavigationService,
              private questionService: QuestionService,
              private router: Router,
              private quizService: QuizService,
  ) {
  }

  ngOnInit(): void {
    // if (!this.isProduction) {
    //   this.questionService.currentQuestion$.subscribe(question => {
    //     if (question?.options) {
    //       this.correctAnswer = question.options.correctIndex.map(value => value + 1)
    //     } else {
    //       this.correctAnswer = undefined;
    //     }
    //   })
    // }

    this.route.params.pipe().subscribe(({quiz}) => {
      try {
        this.quizService.setQuiz(quiz);
      } catch (e) {
        console.warn("Found unknown quiz, redirecting to default", e)
        this.router.navigateByUrl(this.quizService.getDefault())
      }
    });
  }

  startOver() {
    this.questionService.resetQuestionnaire();
    this.router.navigate(['/']);
  }

}
