import {Injectable} from '@angular/core';
import {map, ReplaySubject} from "rxjs";
import {Flow, FlowBuilder} from "../models/flow.model";
import {QuestionsREST} from "./questions/rest";
import {Question} from "../models/question.model";

@Injectable({
  providedIn: 'root'
})
export class FlowService {
  private activeFlow = new ReplaySubject<Flow>()
  public activeFlow$ = this.activeFlow.asObservable();
  private currentFlowLocation = new ReplaySubject<string>();
  public currentFlowLocation$ = this.activeFlow.asObservable();
  private question$ = this.activeFlow.pipe(map(question => {
    return question.questions.reduce((prev, current) => prev.set(current.question, current), new Map<string, Question>());
  }))
  // public currentQuestion$ = combineLatest([this.currentFlowLocation, this.activeFlow])
  //   .pipe(map(([location, flow]) => {
  //     if(!flow || !location){
  //       return null;
  //     }else{
  //       return flow.questions[]
  //     }
  //   }));

  private flows = new Map<string, Flow>();

  constructor() {
    this.flows.set("test", new FlowBuilder()
      .withStartPage([{type: 'simple-text', content: 'Test start'}])
      .withQuestions([QuestionsREST["idempotent-method"]])
      .withEnd([{type: 'simple-text', content: 'Test end'}])
      .build())
  }

  setActiveFlowFromId(id: string) {
    const flow = this.flows.get(id);
    if (!flow) throw new Error("Unknown flow: " + id);
    this.activeFlow.next(flow);
  }
}
