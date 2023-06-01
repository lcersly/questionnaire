import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../../../services/question.service";
import {NavigationService} from "../../../../services/navigation.service";
import { FormControl, FormGroup, ValidationErrors, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {FirestoreService} from "../../../../services/firestore.service";
import {SignupData} from "../../../../models/signup.model";
import { KeyValue, NgIf, NgFor, AsyncPipe, KeyValuePipe } from "@angular/common";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import {QuizService} from "../../../../services/quiz.service";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-page-finish',
    templateUrl: './page-submit.component.html',
    styleUrls: ['./page-submit.component.scss'],
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, NgFor, MatButtonModule, RouterLink, AsyncPipe, KeyValuePipe, TranslateModule]
})
export class PageSubmitComponent implements OnInit {
  public form = new FormGroup({
    name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60)
      ]
    ),
    email: new FormControl('', [
        Validators.required,
        Validators.email
      ]
    ),
    mobile: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.pattern(/^[+]?\d*$/)
      ]
    ),
  })

  constructor(private navService: NavigationService,
              public questionService: QuestionService,
              private router: Router,
              private route: ActivatedRoute,
              private firestoreService: FirestoreService,
              private translateService: TranslateService,
              private quizService: QuizService,
  ) {
  }

  get emailControl() {
    return this.form.get('email') as FormControl
  }

  get nameControl() {
    return this.form.get('name') as FormControl
  }

  get mobileControl() {
    return this.form.get('mobile') as FormControl
  }

  ngOnInit(): void {
    this.questionService.setCurrentPosition('submit');
    this.navService.setBoth();
    const storedPerson = localStorage.getItem('person');
    if (storedPerson) {
      this.form.patchValue(JSON.parse(storedPerson));
    }
    this.form.valueChanges.subscribe(() => localStorage.setItem("person", JSON.stringify(this.form.value)))
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    let value = this.form.value as SignupData;
    value.quizId = this.quizService.quiz?.name;
    this.firestoreService.sendSignup(value)
      .subscribe(() => {
        //console.info("Response from firebase", data);
        localStorage.clear();
        this.router.navigate(['..', 'thanks'], {relativeTo: this.route});
      })
  }

  startOver() {
    this.questionService.resetQuestionnaire();
    this.router.navigate(['..', 'start'], {relativeTo: this.route});
  }

  getError(error: KeyValue<string, ValidationErrors>, section: string) {
    return this.translateService.get(`special-pages.submit.correct.form.${section}.${error.key}`, error.value)
  }
}
