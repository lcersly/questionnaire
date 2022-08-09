import {Component, OnInit} from '@angular/core';
import {PageElement} from "../../../../models/page-element.model";
import {QuestionService} from "../../../../services/question.service";

@Component({
  selector: 'app-question-text',
  templateUrl: './question-text.component.html',
  styleUrls: ['./question-text.component.scss']
})
export class QuestionTextComponent implements OnInit {
  public headerElements: PageElement[] | undefined;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.currentQuestion$.subscribe(question => this.headerElements = question?.question);
  }

}
