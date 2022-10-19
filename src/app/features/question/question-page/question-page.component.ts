import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationService} from "../../../services/navigation.service";
import {QuestionService} from "../../../services/question.service";
import {TranslateService} from "@ngx-translate/core";
import {combineLatest} from "rxjs";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {


  constructor(private route: ActivatedRoute,
              private navService: NavigationService,
              private questionService: QuestionService,
              private translationService: TranslateService,
              private quizService: QuizService,
              private router: Router,
  ) {
  }


  ngOnInit(): void {
    // this will update whenever the page id changes
    combineLatest([this.route.params, this.quizService.quiz$])
      .subscribe(([{id}, quiz]) => {
        if (!quiz || !id) {
          return;
        }

        const pageId = +id;
        const index = pageId - 1;

        if (pageId <= 0 || pageId > quiz.questions.length) {
          console.warn(`Index outside of questions: ${index}. Navigating to first page`)
          this.router.navigate([quiz.route, "start"])
        }

        //default question setup
        const question = quiz.questions[index];
        let prev = {link: '../' + (pageId - 1), text: this.buttonText('PREVIOUSQUESTION')};
        let next = {link: '../' + (pageId + 1), text: this.buttonText('NEXTQUESTION')};

        //special handling of first and last question
        // console.info("Pageid", pageId, quiz.questions.length);
        if (pageId === 0) {
          prev = {link: '../start', text: this.buttonText('BACKTOSTART')};
        } else if (pageId === quiz.questions.length) {
          next.link = '../submit'
        } else if (pageId > quiz.questions.length) {
          next = {link: '../submit', text: this.buttonText('Send')};
        }

        this.questionService.setCurrentPosition('question', index, question);
        this.navService.setBoth(prev, next);
      });
  }

  buttonText(key: string) {
    return this.translationService.get(`question-page.buttons.${key}`);
  }

}
