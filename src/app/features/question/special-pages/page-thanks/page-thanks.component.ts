import {Component, OnInit} from '@angular/core';
import {NavigationService} from "../../../../services/navigation.service";
import {QuestionService} from "../../../../services/question.service";
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-page-thanks',
    templateUrl: './page-thanks.component.html',
    styleUrls: ['./page-thanks.component.scss'],
    standalone: true,
    imports: [TranslateModule]
})
export class PageThanksComponent implements OnInit {

  constructor(private navService: NavigationService, public questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.setCurrentPosition('end');
    this.navService.setBoth();
  }

}
