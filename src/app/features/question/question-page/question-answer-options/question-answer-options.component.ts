import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {PageElement} from "../../../../models/page-element.model";
import {QuestionService} from "../../../../services/question.service";

@Component({
  selector: 'app-question-answers',
  templateUrl: './question-answer-options.component.html',
  styleUrls: ['./question-answer-options.component.scss']
})
export class QuestionAnswerOptionsComponent implements OnInit {
  public form = new FormControl();
  public answers: PageElement[] | undefined;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.currentQuestion$.subscribe(question => this.answers = question?.answers);
    this.questionService.currentQuestionAnswer$.subscribe(currentAnswer => {
      if (currentAnswer && currentAnswer.index != undefined) {
        // console.info("Updating form value from previous", currentAnswer);
        this.form.setValue(currentAnswer?.index, {emitEvent: false});
      } else {
        // console.info("Resetting form", currentAnswer);
        this.form.reset(null, {emitEvent: false});
      }
    });
    this.form.valueChanges.subscribe(() => this.questionService.registerAnswer(this.form.value));
  }
}
