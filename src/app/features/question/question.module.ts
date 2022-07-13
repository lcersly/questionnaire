import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationButtonsComponent} from './shared/navigation-buttons/navigation-buttons.component';
import {PageSubmitComponent} from './special-pages/page-submit/page-submit.component';
import {QuestionRootComponent} from './question-root.component';
import {PageStartComponent} from './special-pages/page-start/page-start.component';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {QuestionHeaderComponent} from './question-page/question-header/question-header.component';
import {QuestionAnswersComponent} from './question-page/question-answers/question-answers.component';
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {PageThanksComponent} from './special-pages/page-thanks/page-thanks.component';
import {HeaderComponent} from './shared/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {QuestionPageComponent} from "./question-page/question-page.component";


@NgModule({
  declarations: [
    NavigationButtonsComponent,
    PageSubmitComponent,
    QuestionRootComponent,
    PageStartComponent,
    QuestionHeaderComponent,
    QuestionAnswersComponent,
    PageThanksComponent,
    HeaderComponent,
    QuestionPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatProgressBarModule
  ]
})
export class QuestionModule {
}
