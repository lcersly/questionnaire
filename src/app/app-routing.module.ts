import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StaticRootComponent} from "./components/static/static-root.component";
import {PageSubmitComponent} from "./components/static/special-pages/page-submit/page-submit.component";
import {PageStartComponent} from "./components/static/special-pages/page-start/page-start.component";
import {PageThanksComponent} from "./components/static/special-pages/page-thanks/page-thanks.component";
import {QuestionPageComponent} from "./components/static/question-page/question-page.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'static'},
  {
    path: 'static', component: StaticRootComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'start'},
      {path: 'start', component: PageStartComponent},
      {path: 'submit', component: PageSubmitComponent},
      {path: 'thanks', component: PageThanksComponent},
      {path: ':id', component: QuestionPageComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
