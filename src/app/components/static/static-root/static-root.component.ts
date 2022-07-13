import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../../services/question.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-static-root',
  templateUrl: './static-root.component.html',
  styleUrls: ['./static-root.component.scss']
})
export class StaticRootComponent implements OnInit {

  constructor(private questionService: QuestionService, private router: Router) {
  }

  ngOnInit(): void {
    this.questionService.setQuestionnaireLength(4);
  }

  startOver() {
    this.questionService.resetQuestionnaire();
    this.router.navigate(['/']);
  }
}
