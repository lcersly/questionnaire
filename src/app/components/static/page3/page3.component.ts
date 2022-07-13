import {Component, OnInit} from '@angular/core';
import {QuestionsCode} from "../../../services/questions/code";
import {QuestionService} from "../../../services/question.service";
import {NavigationService} from "../../../services/navigation.service";

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss']
})
export class Page3Component implements OnInit {

  constructor(private navService: NavigationService, private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.setCurrentPosition('question', 2, QuestionsCode["referential-transparent"]);

    this.navService.setBoth(
      {link: '2', text: 'Tilbage'},
      {link: '4', text: 'Næste spørgsmål'}
    )
  }

}
