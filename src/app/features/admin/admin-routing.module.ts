import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminRootComponent} from "./components/admin-root.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {AnswerListComponent} from "./components/answer-list/answer-list.component";
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {ManageAdminsComponent} from "./components/manage-admins/manage-admins.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['admin/login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['admin/answers']);

const routes: Routes = [
  {
    path: '', component: AdminRootComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'login', component: LoginPageComponent, ...canActivate(redirectLoggedInToItems)},
      {path: 'manage-admins', component: ManageAdminsComponent, ...canActivate(redirectUnauthorizedToLogin)},
      {path: 'answers', component: AnswerListComponent, ...canActivate(redirectUnauthorizedToLogin)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
