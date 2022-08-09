import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationButtonsComponent} from './shared/navigation-buttons/navigation-buttons.component';
import {PageSubmitComponent} from './special-pages/page-submit/page-submit.component';
import {QuestionRootComponent} from './question-root.component';
import {PageStartComponent} from './special-pages/page-start/page-start.component';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {QuestionTextComponent} from './question-page/question-text/question-text.component';
import {
  QuestionAnswerOptionsComponent
} from './question-page/question-answer-options/question-answer-options.component';
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {PageThanksComponent} from './special-pages/page-thanks/page-thanks.component';
import {HeaderComponent} from './shared/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {QuestionPageComponent} from "./question-page/question-page.component";
import {HIGHLIGHT_OPTIONS, HighlightModule} from "ngx-highlightjs";
import {CodePageElementComponent} from './shared/code-page-element/code-page-element.component';


@NgModule({
  declarations: [
    NavigationButtonsComponent,
    PageSubmitComponent,
    QuestionRootComponent,
    PageStartComponent,
    QuestionTextComponent,
    QuestionAnswerOptionsComponent,
    PageThanksComponent,
    HeaderComponent,
    QuestionPageComponent,
    CodePageElementComponent,
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
    MatProgressBarModule,
    HighlightModule
  ],
  providers: [{
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        javascript: () => import('highlight.js/lib/languages/javascript'),
        scala: () => import('highlight.js/lib/languages/scala'),
        java: () => import('highlight.js/lib/languages/java'),
        // css: () => import('highlight.js/lib/languages/css'),
        // xml: () => import('highlight.js/lib/languages/xml')
      },
    }
  }],
})
export class QuestionModule {
}
