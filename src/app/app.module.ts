import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuestionPageComponent} from './components/question-page/question-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlowModule} from "./components/flow/flow.module";
import {StaticModule} from "./components/static/static.module";

@NgModule({
  declarations: [
    AppComponent,
    QuestionPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlowModule,
    StaticModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
