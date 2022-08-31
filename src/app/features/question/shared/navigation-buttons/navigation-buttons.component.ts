import {Component, OnInit} from '@angular/core';
import {NavigationService} from "../../../../services/navigation.service";
import {QuestionService} from "../../../../services/question.service";
import {Observable} from "rxjs";

export type NavigationButton = { text: Observable<string>, link: string, enableWithoutAnswer?: boolean };

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss']
})
export class NavigationButtonsComponent implements OnInit {

  next: undefined | NavigationButton;
  previous: undefined | NavigationButton;
  enableFinish: boolean | undefined = false;

  constructor(private navService: NavigationService, public questionService: QuestionService) {
  }

  ngOnInit(): void {

    this.navService.navigation$.subscribe(({prev, next, enableFinish}) => {
      this.next = next;
      this.previous = prev;
      this.enableFinish = enableFinish;
    })
  }

}
