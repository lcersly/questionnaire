import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HttpLoaderFactory } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { QuestionModule } from './app/features/question/question.module';
import { withInterceptorsFromDi, provideHttpClient, HttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideFirestore, getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore/lite';
import { provideAuth, getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
        // firebase init
        provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => {
            const auth = getAuth();
            // auth.setPersistence({type: "SESSION"});
            if (environment.useEmulators) {
                console.info("Using emulator for authentication");
                connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
            }
            return auth;
        }), provideFirestore(() => {
            const firestore = getFirestore();
            if (environment.useEmulators) {
                console.info("Using emulator for user firestore");
                connectFirestoreEmulator(firestore, 'localhost', 8080);
            }
            return firestore;
        }), //uses lite version of firestore
        BrowserModule, AppRoutingModule, QuestionModule, MatCardModule, TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
