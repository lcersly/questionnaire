import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../../../../services/question.service";
import {NavigationService} from "../../../../services/navigation.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FirestoreService} from "../../../../services/firestore.service";
import {SignupData} from "../../../../models/signup.model";

@Component({
  selector: 'app-page-finish',
  templateUrl: './page-submit.component.html',
  styleUrls: ['./page-submit.component.scss']
})
export class PageSubmitComponent implements OnInit {
  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required]),
  })

  constructor(private navService: NavigationService,
              public questionService: QuestionService,
              private router: Router,
              private route: ActivatedRoute,
              private firestoreService: FirestoreService
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

    this.firestoreService.sendSignup(this.form.value as SignupData)
      .subscribe((data) => {
        //console.info("Response from firebase", data);
        localStorage.clear();
        this.router.navigate(['..', 'thanks'], {relativeTo: this.route});
      })
  }

  startOver() {
    this.questionService.resetQuestionnaire();
    this.router.navigate(['..', 'start'], {relativeTo: this.route});
  }
}
