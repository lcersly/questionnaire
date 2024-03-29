import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {AnswerListComponent} from './components/answer-list/answer-list.component';
import {MatButtonModule} from "@angular/material/button";
import {AdminRootComponent} from "./components/admin-root.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {connectFirestoreEmulator, initializeFirestore, provideFirestore} from "@angular/fire/firestore";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {SignupService} from "./signup.service";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {
  DialogSignupPickedComponent
} from "./components/answer-list/signup-picked-dialog/dialog-signup-picked.component";
import {environment} from "../../../environments/environment";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ManageAdminsComponent} from './components/manage-admins/manage-admins.component';
import {AdminHeaderComponent} from './components/admin-header/admin-header.component';
import {MatListModule} from "@angular/material/list";
import {AdminService} from "./admin.service";
import {DialogAddAdminComponent} from "./components/manage-admins/add-admin-dialog/dialog-add-admin.component";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {getApp} from "@angular/fire/app";
import {MatBadgeModule} from "@angular/material/badge";
import {LocalizedDatePipe} from "./localized-date.pipe";
import {MatTooltipModule} from "@angular/material/tooltip";
import {DialogQuizPickComponent} from "./components/answer-list/pick-quiz-dialog/dialog-quiz-pick.component";
import {
  DialogSignupEditMultipleComponent
} from "./components/answer-list/edit-multiple-dialog/dialog-signup-edit-multiple.component";


@NgModule({
    imports: [
        provideFirestore(() => {
            //experimentalForceLongPolling is needed. Otherwise, the BD proxy will block the requests to firestore.
            const firestore = initializeFirestore(getApp(), { experimentalForceLongPolling: true });
            if (environment.useEmulators) {
                console.info("Using emulator for admin firestore");
                connectFirestoreEmulator(firestore, 'localhost', 8080);
            }
            return firestore;
        }),
        CommonModule,
        MatButtonModule,
        AdminRoutingModule,
        MatToolbarModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatDialogModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatInputModule,
        ReactiveFormsModule,
        MatBadgeModule,
        MatTooltipModule,
        LoginPageComponent,
        AnswerListComponent,
        AdminRootComponent,
        DialogQuizPickComponent,
        DialogSignupPickedComponent,
        DialogSignupEditMultipleComponent,
        ManageAdminsComponent,
        AdminHeaderComponent,
        LocalizedDatePipe
    ],
    providers: [
        SignupService,
        AdminService,
    ]
})
export class AdminModule {
}
