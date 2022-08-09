import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminRootComponent} from "./components/admin-root.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {AnswerListComponent} from "./components/answer-list/answer-list.component";
import {IsLoggedInGuard} from "./guards/is-logged-in.guard";
import {IsNotLoggedInGuard} from "./guards/is-not-logged-in.guard";

const routes: Routes = [
  {
    path: '', component: AdminRootComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'login', component: LoginPageComponent, canActivate: [IsNotLoggedInGuard]},
      {path: 'answers', component: AnswerListComponent, canActivate: [IsLoggedInGuard]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
