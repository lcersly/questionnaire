import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionRootComponent} from "./features/question/question-root.component";
import {PageSubmitComponent} from "./features/question/special-pages/page-submit/page-submit.component";
import {PageStartComponent} from "./features/question/special-pages/page-start/page-start.component";
import {PageThanksComponent} from "./features/question/special-pages/page-thanks/page-thanks.component";
import {QuestionPageComponent} from "./features/question/question-page/question-page.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'admin'},
  {path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)},
  {
    path: '', component: QuestionRootComponent, children: [
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
