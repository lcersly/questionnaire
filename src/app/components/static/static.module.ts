import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Page1Component} from "./page1/page1.component";
import {Page2Component} from './page2/page2.component';
import {Page3Component} from './page3/page3.component';
import {Page4Component} from './page4/page4.component';
import {NavigationButtonsComponent} from './shared/navigation-buttons/navigation-buttons.component';
import {PageSubmitComponent} from './page-submit/page-submit.component';
import {StaticRootComponent} from './static-root/static-root.component';
import {PageStartComponent} from './page-start/page-start.component';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {QuestionHeaderComponent} from './shared/question-header/question-header.component';
import {QuestionAnswersComponent} from './shared/question-answers/question-answers.component';
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {PageThanksComponent} from './page-thanks/page-thanks.component';
import {HeaderComponent} from './shared/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    Page1Component,
    Page2Component,
    Page3Component,
    Page4Component,
    NavigationButtonsComponent,
    PageSubmitComponent,
    StaticRootComponent,
    PageStartComponent,
    QuestionHeaderComponent,
    QuestionAnswersComponent,
    PageThanksComponent,
    HeaderComponent
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
export class StaticModule {
}
