import {Component, OnInit} from '@angular/core';
import {PageElement} from "../../../../models/page-element.model";
import {QuestionService} from "../../../../services/question.service";

@Component({
  selector: 'app-question-header',
  templateUrl: './question-header.component.html',
  styleUrls: ['./question-header.component.scss']
})
export class QuestionHeaderComponent implements OnInit {
  public headerElements: PageElement[] | undefined;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.currentQuestion$.subscribe(question => this.headerElements = question?.question);
  }

}
