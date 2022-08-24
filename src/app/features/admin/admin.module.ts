import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {AnswerListComponent} from './components/answer-list/answer-list.component';
import {MatButtonModule} from "@angular/material/button";
import {AdminRootComponent} from "./components/admin-root.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {initializeFirestore, provideFirestore} from "@angular/fire/firestore";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {getApp} from "@angular/fire/app";
import {MatIconModule} from "@angular/material/icon";
import {SignupService} from "./signup.service";
import {
  DialogSignupEditMultipleComponent
} from "./components/answer-list/signup-dialog/dialog-signup-edit-multiple.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {
  DialogSignupPickedComponent
} from "./components/answer-list/signup-picked-dialog/dialog-signup-picked.component";


@NgModule({
  declarations: [
    LoginPageComponent,
    AnswerListComponent,
    AdminRootComponent,
    DialogSignupEditMultipleComponent,
    DialogSignupPickedComponent,
  ],
  imports: [
    provideFirestore(() => initializeFirestore(getApp(), {experimentalForceLongPolling: true})),
    CommonModule,
    MatButtonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    //uses lite version of firestore
  ],
  providers: [
    SignupService
  ]
})
export class AdminModule {
}
