import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../../../services/question.service";
import {NavigationService} from "../../../../services/navigation.service";
import {of} from "rxjs";

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

    this.navService.setBoth(undefined, {text: of('Start'), link: '../1', enableWithoutAnswer: true});
  }

}
