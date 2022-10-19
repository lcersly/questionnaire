import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageElement} from "../../../../models/page-element.model";
import {QuestionService} from "../../../../services/question.service";
import {combineLatest, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-question-text',
  templateUrl: './question-text.component.html',
  styleUrls: ['./question-text.component.scss']
})
export class QuestionTextComponent implements OnInit, OnDestroy {
  public headerElements: PageElement[] | undefined;
  private onDestroy = new Subject<void>()
  index?: number;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    combineLatest([
      this.questionService.currentQuestion$,
      this.questionService.currentIndex$])
      .pipe(
        takeUntil(this.onDestroy)
      ).subscribe(([question, index]) => {
      this.headerElements = question?.question;
      this.index = index;
      if(this.index != undefined){
        this.index++;
      }
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
