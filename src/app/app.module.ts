import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuestionModule} from "./features/question/question.module";
import {HttpClientModule} from "@angular/common/http";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environments/environment";
import {connectAuthEmulator, getAuth, provideAuth} from "@angular/fire/auth";
import {connectFirestoreEmulator, getFirestore, provideFirestore} from "@angular/fire/firestore/lite";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // firebase init
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099', {disableWarnings: true});
      }
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.useEmulators) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      return firestore;
    }), //uses lite version of firestore

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    QuestionModule,
    MatCardModule,
  ],
  providers: [
    // { provide: USE_DEVICE_LANGUAGE, useValue: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
