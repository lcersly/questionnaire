import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavigationButton} from "../shared/navigation-buttons/navigation-buttons.component";
import {NavigationService} from "../../../services/navigation.service";
import {QuestionService} from "../../../services/question.service";
import {Question} from "../../../models/question.model";
import {QuestionsREST} from "../../../services/questions/rest";
import {QuestionsSprint} from "../../../services/questions/sprint";
import {QuestionsCode} from "../../../services/questions/code";

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {


  constructor(private route: ActivatedRoute,
              private navService: NavigationService,
              private questionService: QuestionService,
  ) {
  }


  ngOnInit(): void {
    // this will update whenever the page id changes
    this.route.params.pipe().subscribe(({id}) => {
      const pageId = +id;
      console.info("QuestionPageComponent loading question", id);

      let question: Question;
      let prev: NavigationButton, next: NavigationButton;
      const index = pageId - 1;

      switch (pageId) {
        case 1:
          question = QuestionsREST["idempotent-method"];
          prev = {link: '../start', text: 'Tilbage til start'};
          next = {link: '../2', text: 'Næste spørgsmål'};
          break;
        case 2:
          question = QuestionsSprint["who-decides-what-the-team-works-on-in-the-sprint"];
          prev = {link: '../1', text: 'Tilbage'};
          next = {link: '../3', text: 'Næste spørgsmål'};
          break;
        case 3:
          question = QuestionsCode["referential-transparent"];
          prev = {link: '../2', text: 'Tilbage'};
          next = {link: '../4', text: 'Næste spørgsmål'};
          break;
        case 4:
          question = QuestionsCode["addition-of-numbers"];
          prev = {link: '../3', text: 'Tilbage'};
          next = {link: '../submit', text: 'Næste'};
          break;
        default:
          console.error("Unknown id", id);
          throw new Error("Unknown id " + id)
      }

      this.questionService.setCurrentPosition('question', index, question);
      this.navService.setBoth(prev, next);
    });
  }

}
