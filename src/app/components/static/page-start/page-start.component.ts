import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../../services/question.service";
import {NavigationService} from "../../../services/navigation.service";

@Component({
  selector: 'app-page-start',
  templateUrl: './page-start.component.html',
  styleUrls: ['./page-start.component.scss']
})
export class PageStartComponent implements OnInit {

  constructor(private navService: NavigationService, private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.setCurrentQuestion();

    this.navService.setBoth(undefined, {text: 'Next', link: '1', enableWithoutAnswer: true});
  }

}
