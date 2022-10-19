import {Injectable} from '@angular/core';
import {Question} from "../models/question.model";
import {BehaviorSubject, combineLatest, first, map, ReplaySubject, shareReplay} from "rxjs";
import {environment} from "../../environments/environment";

type Answer = { answerIndex: number | number[], correct: boolean, questionNumber: number };

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
      return answer.answerIndex === -1;
    }),
    shareReplay(1)
  );

  private questionnaireLength = 0;

  constructor() {
    // this.answers$.subscribe(answers => console.info("Answers updated", answers));
  }

  private readonly oldAnswers = "answers";

  public setQuestionnaireLength(length: number) {
    this.questionnaireLength = length;

    const oldRawAnswers = localStorage.getItem(this.oldAnswers);
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
    localStorage.removeItem(this.oldAnswers);

    const values = [];
    for (let i = 0; i < this.questionnaireLength; i++) {
      values.push({correct: false, answerIndex: -1, questionNumber: i + 1} as Answer)
    }
    // console.debug("Resetting questionnaire to", values);

    this.answers$.next(values);
  }

  public setCurrentPosition(name: 'start' | 'question' | 'end' | 'submit', index?: number, question?: Question) {
    this.currentPosition.next({name, index, question})
  }

  public isAllAnswersCorrect() {
    return this.correctAnswersAmount() == this.totalAnswersAmount();
  }

  public isAnyAnswerIncorrect() {
    return this.incorrectAnswersAmount() > 0;
  }

  public incorrectAnswersAmount() {
    return this.answers$.getValue().reduce((prev, current) => !current.correct ? prev + 1 : prev, 0)
  }


  public correctAnswersAmount() {
    return this.answers$.getValue().reduce((prev, current) => current.correct ? prev + 1 : prev, 0)
  }

  public totalAnswersAmount() {
    return this.answers$.getValue().length;
  }

  public incorrectAnswers() {
    return this.answers$.getValue().filter((answer) => !answer.correct)
  }

  public registerAnswer(value: number | number[]) {
    return combineLatest([this.currentPosition, this.answers$])
      .pipe(first())
      .subscribe(([position, answers]) => {
        const index = position.index;
        const question = position.question;
        if (!answers || index == undefined || !question) {
          console.error("Index, answers or question undefined", answers, index, question);
          return;
        }
        const answer: Answer = answers[index];
        answer.answerIndex = value;
        answer.correct = QuestionService.isAnswerCorrect(question, value);
        if(!environment.production){
          console.info("Correct answer", answer.correct, question, value)
        }

        answer.questionNumber = index + 1
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
