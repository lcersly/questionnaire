import {PageElement} from "./page-element.model";

export interface Question {
  readonly question: PageElement[];
  readonly answers: PageElement[];
  readonly options: {
    readonly type: 'radio' | 'checkbox',
    /** ZERO indexed */
    readonly correctIndex: number[]
  };
}
