import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuestionModule} from "./features/question/question.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environments/environment";
import {connectAuthEmulator, getAuth, provideAuth} from "@angular/fire/auth";
import {connectFirestoreEmulator, getFirestore, provideFirestore} from "@angular/fire/firestore/lite";
import {MatCardModule} from "@angular/material/card";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {registerLocaleData} from "@angular/common";
import localeDa from '@angular/common/locales/da';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localeDa, 'da')


