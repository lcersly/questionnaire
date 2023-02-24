import {Question} from "../../models/question.model";

export const QuestionsREST = {
  "idempotent-method": {
    question: [
      {
        type: 'simple-text',
        content: 'Which REST API method is not idempotent?'
      }
    ],
    answers: [
      {
        type: 'simple-text',
        content: 'GET'
      },
      {
        type: 'simple-text',
        content: 'PUT'
      },
      {
        type: 'simple-text',
        content: 'POST'
      }
    ],
    options: {
      type: 'radio',
      correctIndex: [2],
    }
  } as Question
} as const
