import {PageElement} from "./page-element.model";
import {Question} from "./question.model";

export interface Flow {
  start: PageElement[]
  questions: Question[]
  end: PageElement[]
}

export class FlowBuilder {
  private start: PageElement[] = [];
  private questions: Question[] = [];
  private end: PageElement[] = [];

  constructor() {
  }

  withStartPage(start: PageElement[]) {
    this.start = start;
    return this;
  }

  withQuestions(questions: Question[]) {
    this.questions = questions;
    return this;
  }

  withEnd(end: PageElement[]) {
    this.end = end;
    return this;
  }

  build(): Flow {
    return {
      start: this.start,
      questions: this.questions,
      end: this.end
    }
  }
}
