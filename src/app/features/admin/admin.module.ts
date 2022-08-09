import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {AnswerListComponent} from './components/answer-list/answer-list.component';
import {MatButtonModule} from "@angular/material/button";
import {AdminRootComponent} from "./components/admin-root.component";
import {AdminRoutingModule} from "./admin-routing.module";


@NgModule({
  declarations: [
    LoginPageComponent,
    AnswerListComponent,
    AdminRootComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    AdminRoutingModule,

  ]
})
export class AdminModule {
}
