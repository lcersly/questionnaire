import {Injectable} from '@angular/core';
import {Question} from "../models/question.model";
import {BehaviorSubject, combineLatest, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private currentQuestion = new BehaviorSubject<Question | undefined>(undefined);
  public currentQuestion$ = this.currentQuestion.asObservable();
  public currentAnswerOptions$ = this.currentQuestion$.pipe(map(question => question?.answers));
  public currentQuestionHeader$ = this.currentQuestion$.pipe(map(question => question?.question));
  public currentQuestionOptions$ = this.currentQuestion$.pipe(map(question => question?.options));
  public currentIndex$ = new BehaviorSubject<number | undefined>(undefined);
  public answers$ = new BehaviorSubject<number[]>([]);
  public currentQuestionAnswer$ = combineLatest([this.currentIndex$, this.answers$]).pipe(map(([curIndex, answers]) => {
    if (curIndex == undefined) return undefined;
    return answers[curIndex];
  }))
  public currentQuestionHasAnswer$ = this.currentQuestionAnswer$.pipe(map(answer => answer != undefined));
  public currentQuestionHasNoAnswer$ = this.currentQuestionAnswer$.pipe(map(answer => answer == undefined));

  constructor() {
  }

  setQuestionnaireLength(length: number) {
    const oldAnswers = JSON.parse(localStorage.getItem("answers") || '[]') as number[];
    if (oldAnswers?.length == length) {
      this.answers$.next(oldAnswers);
    } else {
      this.answers$.next(new Array(length).fill(null));
    }
  }

  setCurrentQuestion(index?: number, question?: Question) {
    this.currentIndex$.next(index);
    this.currentQuestion.next(question);
  }

  registerAnswer(value: number) {
    let answers = this.answers$.getValue();
    let index = this.currentIndex$.value;
    if (!answers || index == undefined) {
      console.error("Index or answers undefined", answers, index);
      return;
    }
    answers[index] = value;
    this.answers$.next(answers);
    localStorage.setItem("answers", JSON.stringify(answers));
  }

}
