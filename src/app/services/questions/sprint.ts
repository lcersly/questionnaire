import {Question} from "../../models/question.model";

export const QuestionsSprint = {
  'who-decides-what-the-team-works-on-in-the-sprint':
    {
      question: [
        {
          type: 'simple-text',
          content: 'Who decides what the team works on during the sprint (14-days interval/iteration)?'
        },
      ],
      answers: [
        {
          type: 'simple-text',
          content: 'Product owner'
        },
        {
          type: 'simple-text',
          content: 'Project leader'
        },
        {
          type: 'simple-text',
          content: 'Developers'
        },
        {
          type: 'simple-text',
          content: 'Team manager'
        },
      ],
      options: {
        type: 'radio',
        correctIndex: [2],
      }
    } as Question
} as const;
