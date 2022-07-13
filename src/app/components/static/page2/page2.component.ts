import {Component, OnInit} from '@angular/core';
import {QuestionsSprint} from "../../../services/questions/sprint";
import {QuestionService} from "../../../services/question.service";
import {NavigationService} from "../../../services/navigation.service";

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit {

  constructor(private navService: NavigationService, private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.setCurrentPosition('question', 1, QuestionsSprint["who-decides-what-the-team-works-on-in-the-sprint"]);

    this.navService.setBoth(
      {link: '1', text: 'Tilbage'},
      {link: '3', text: 'Næste spørgsmål'}
    )
  }
}
