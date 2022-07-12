import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../../services/question.service";

@Component({
  selector: 'app-static-root',
  templateUrl: './static-root.component.html',
  styleUrls: ['./static-root.component.scss']
})
export class StaticRootComponent implements OnInit {

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.setQuestionnaireLength(4);
  }

}
