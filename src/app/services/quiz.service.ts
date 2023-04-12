import {Injectable} from '@angular/core';
import {QuestionsREST} from "./questions/rest";
import {QuestionsSprint} from "./questions/sprint";
import {QuestionsCode} from "./questions/code";
import {ReplaySubject} from "rxjs";
import {Question} from "../models/question.model";
import {QuestionService} from "./question.service";
import {QuestionsBankdata} from "./questions/bankdata";

export type Quiz = {
  name: string;
  route: string;
  questions: Question[]
};

const quizes: Record<string, Quiz> = {
  'developer': {
    name: 'Developer',
    route: 'developer',
    questions: [
      QuestionsREST["idempotent-method"],
      QuestionsSprint["who-decides-what-the-team-works-on-in-the-sprint"],
      QuestionsCode["referential-transparent"],
      QuestionsCode["addition-of-numbers"]
    ]
  },
  'bankdata': {
    name: 'Bankdata',
    route: 'bankdata',
    questions: [
      QuestionsBankdata["what-does-bankdata-do"],
      QuestionsBankdata["the-whole-person"],
      QuestionsBankdata["devops-mindset"],
      QuestionsBankdata["working-expectations"],
    ]
  },
  'ucl': {
    name: 'UCL',
    route: 'ucl',
    questions: [
      QuestionsREST["idempotent-method"],
      QuestionsSprint["who-decides-what-the-team-works-on-in-the-sprint"],
      QuestionsCode["advanced-addition"],
    ]
  }
};


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public readonly quiz$ = new ReplaySubject<Quiz | undefined>()
  public quiz?: Quiz;

  constructor(private questionService: QuestionService) {
    this.quiz$.subscribe(quiz=>this.quiz=quiz);
  }

  setQuiz(quizId: string) {
    if (!quizes.hasOwnProperty(quizId)) {
      this.quiz$.next(undefined);
      throw new Error("Unknown quiz: " + quizId);
    }

    const quiz = quizes[quizId];

    console.info("Loading quiz: " + quiz.name)

    this.quiz$.next(quiz);
    this.questionService.setQuizDetails(quiz.questions.length, quiz.name);
  }

  getDefault() {
    return Object.keys(quizes)[0]
  }


}
