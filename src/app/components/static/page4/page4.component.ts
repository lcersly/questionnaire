import {Component, OnInit} from '@angular/core';
import {QuestionsCode} from "../../../services/questions/code";
import {QuestionService} from "../../../services/question.service";
import {NavigationService} from "../../../services/navigation.service";

@Component({
  selector: 'app-page4',
  templateUrl: './page4.component.html',
  styleUrls: ['./page4.component.scss']
})
export class Page4Component implements OnInit {

  constructor(private navService: NavigationService, private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.setCurrentPosition('question', 3, QuestionsCode["addition-of-numbers"]);

    this.navService.setBoth(
      {link: '3', text: 'Tilbage'},
      {link: 'submit', text: 'Næste'}
    )
  }

}
