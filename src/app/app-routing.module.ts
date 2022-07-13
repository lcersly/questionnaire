import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartFlowComponent} from "./components/flow/start-flow/start-flow.component";
import {EndFlowComponent} from "./components/flow/end-flow/end-flow.component";
import {QuestionPageComponent} from "./components/question-page/question-page.component";
import {FlowListComponent} from "./components/flow/flow-list/flow-list.component";
import {FlowRootComponent} from "./components/flow/root-flow/flow-root.component";
import {StaticRootComponent} from "./components/static/static-root/static-root.component";
import {Page1Component} from "./components/static/page1/page1.component";
import {Page2Component} from "./components/static/page2/page2.component";
import {Page3Component} from "./components/static/page3/page3.component";
import {Page4Component} from "./components/static/page4/page4.component";
import {PageSubmitComponent} from "./components/static/page-submit/page-submit.component";
import {PageStartComponent} from "./components/static/page-start/page-start.component";
import {PageThanksComponent} from "./components/static/page-thanks/page-thanks.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'static'},
  {path: 'list', component: FlowListComponent},
  {
    path: 'static', component: StaticRootComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'start'},
      {path: 'start', component: PageStartComponent},
      {path: '1', component: Page1Component},
      {path: '2', component: Page2Component},
      {path: '3', component: Page3Component},
      {path: '4', component: Page4Component},
      {path: 'submit', component: PageSubmitComponent},
      {path: 'thanks', component: PageThanksComponent},
    ]
  },
  {
    path: 'flow/:flow-id', component: FlowRootComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'start'},
      {path: 'start', component: StartFlowComponent},
      {path: 'end', component: EndFlowComponent},
      {path: ':question-id', component: QuestionPageComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
