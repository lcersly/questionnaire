import {Injectable} from '@angular/core';
import {Question} from "../models/question.model";
import {BehaviorSubject, combineLatest, first, map, ReplaySubject, shareReplay} from "rxjs";

type Answer = { index: number | number[], correct: boolean };

type PositionType = 'start' | 'question' | 'end' | 'submit' | undefined;

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private currentPosition = new ReplaySubject<{ name: PositionType, index?: number, question?: Question }>();
  public currentPosition$ = this.currentPosition.asObservable();
  public currentQuestion$ = this.currentPosition.pipe(map(pos => pos.question), shareReplay(1));
  public currentPositionType$ = this.currentPosition.pipe(map(pos => pos.name), shareReplay(1));
  public currentIndex$ = this.currentPosition.pipe(map(pos => pos.index), shareReplay(1));

  public answers$ = new BehaviorSubject<Answer[]>([]);
  public currentQuestionAnswer$ = combineLatest([this.currentIndex$, this.answers$]).pipe(
    map(([curIndex, answers]) => {
      if (curIndex == undefined) return undefined;
      return answers[curIndex];
    }),
    shareReplay(1)
  );
  public currentQuestionHasNoAnswer$ = this.currentQuestionAnswer$.pipe(
    map(answer => {
      if (!answer) return undefined;
      return answer.index === -1;
    }),
    shareReplay(1)
  );

  private questionnaireLength = 0;

  constructor() {
    // this.answers$.subscribe(answers => console.info("Answers updated", answers));
  }

  public setQuestionnaireLength(length: number) {
    this.questionnaireLength = length;

    const oldRawAnswers = localStorage.getItem("answers");
    if (oldRawAnswers) {
      const oldAnswers = JSON.parse(oldRawAnswers);
      if (oldAnswers?.length == this.questionnaireLength) {
        console.debug("Using old answers for initialize with", oldAnswers);
        this.answers$.next(oldAnswers);
        return;
      }
    }
    this.resetQuestionnaire();
  }

  public resetQuestionnaire() {
    localStorage.removeItem('answers');

    const values = [];
    for (let i = 0; i < this.questionnaireLength; i++) {
      values.push({correct: false, index: -1})
    }
    // console.debug("Resetting questionnaire to", values);

    this.answers$.next(values);
  }

  public setCurrentPosition(name: 'start' | 'question' | 'end' | 'submit', index?: number, question?: Question) {
    this.currentPosition.next({name, index, question})
  }

  public isAllAnswersCorrect() {
    return this.correctAnswers() == this.totalAnswers();
  }

  public isAnyAnswerIncorrect() {
    return this.incorrectAnswers() > 0;
  }

  public incorrectAnswers() {
    return this.answers$.getValue().reduce((prev, current) => !current.correct ? prev + 1 : prev, 0)
  }


  public correctAnswers() {
    return this.answers$.getValue().reduce((prev, current) => current.correct ? prev + 1 : prev, 0)
  }

  public totalAnswers() {
    return this.answers$.getValue().length;
  }

  public registerAnswer(value: number | number[]) {
    return combineLatest([this.currentPosition, this.answers$])
      .pipe(first())
      .subscribe(([pos, answers]) => {
        const index = pos.index;
        const question = pos.question;
        if (!answers || index == undefined || !question) {
          console.error("Index, answers or question undefined", answers, index, question);
          return;
        }
        const answer: Answer = answers[index];
        answer.index = value;
        answer.correct = QuestionService.isAnswerCorrect(question, value);
        this.answers$.next([...answers]);

        localStorage.setItem("answers", JSON.stringify(answers));
      })
  }

  private static isAnswerCorrect(question: Question, answer: number | number[]): boolean {
    if (Array.isArray(answer)) {
      for (const number of answer) {
        if (!question.options.correctIndex.includes(number)) {
          return false;
        }
      }
      return true;
    }

    return question.options.correctIndex.includes(answer)
  }

}
