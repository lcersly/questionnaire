import {Injectable} from '@angular/core';
import {QuestionsREST} from "./questions/rest";
import {QuestionsSprint} from "./questions/sprint";
import {QuestionsCode} from "./questions/code";
import {ReplaySubject} from "rxjs";
import {Question} from "../models/question.model";
import {QuestionService} from "./question.service";

export type Quiz = {
  name: string;
  route: string;
  questions: Question[]
};

const quizes: { [key: string]: Quiz } = {
  'developer': {
    name: 'Developer',
    route: 'developer',
    questions: [
      QuestionsREST["idempotent-method"],
      QuestionsSprint["who-decides-what-the-team-works-on-in-the-sprint"],
      QuestionsCode["referential-transparent"],
      QuestionsCode["addition-of-numbers"]
    ]
  }
};


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public readonly quiz$ = new ReplaySubject<Quiz | undefined>()

  constructor(private questionService: QuestionService) {
  }

  setQuiz(quizId: string) {
    if (!quizes.hasOwnProperty(quizId)) {
      this.quiz$.next(undefined);
      throw new Error("Unknown quiz: " + quizId);
    }

    const quiz = quizes[quizId];

    console.info("Loading quiz: " + quiz.name)

    this.quiz$.next(quiz);
    this.questionService.setQuestionnaireLength(quiz.questions.length);
  }

  getDefault() {
    return Object.keys(quizes)[0]
  }
}
