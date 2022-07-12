import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StartFlowComponent} from "./start-flow/start-flow.component";
import {EndFlowComponent} from "./end-flow/end-flow.component";
import {FlowListComponent} from "./flow-list/flow-list.component";
import {FlowRootComponent} from './root-flow/flow-root.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    FlowRootComponent,
    StartFlowComponent,
    EndFlowComponent,
    FlowListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class FlowModule {
}
