import {Component, OnInit} from '@angular/core';
import {QuestionsREST} from "../../../services/questions/rest";
import {QuestionService} from "../../../services/question.service";
import {NavigationService} from "../../../services/navigation.service";

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {
  constructor(private navService: NavigationService, private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.setCurrentQuestion(0, QuestionsREST["idempotent-method"])

    this.navService.setBoth(
      {link: 'start', text: 'Tilbage til start'},
      {link: '2', text: 'Næste spørgsmål'}
    )
  }
}
