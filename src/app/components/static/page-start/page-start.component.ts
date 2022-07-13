import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../../services/question.service";
import {NavigationService} from "../../../services/navigation.service";

@Component({
  selector: 'app-page-start',
  templateUrl: './page-start.component.html',
  styleUrls: ['./page-start.component.scss']
})
export class PageStartComponent implements OnInit {

  constructor(private navService: NavigationService, public questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.setCurrentPosition('start');

    this.navService.setBoth(undefined, {text: 'Start', link: '1', enableWithoutAnswer: true});
  }

}
