import {Question} from "../../models/question.model";

export const QuestionsCode = {
  'addition-of-numbers': {
    question: [
      {
        type: 'simple-text',
        content: 'Is the following expression true or false for e.g. python or C?'
      },
      {
        type: 'code',
        content: '0.1 + 0.2 == 0.3',
        languageHighlighting: 'javascript'
      }
    ],
    answers: [
      {
        type: 'simple-text',
        content: 'True'
      },
      {
        type: 'simple-text',
        content: 'False'
      },
    ],
    options: {
      type: 'radio',
      correctIndex: [1],
    }
  } as Question,
  "referential-transparent": {
    question: [
      {
        type: 'simple-text',
        content: 'Which add snippet is referential transparent?'
      }
    ],
    answers: [
      {
        type: 'code',
        content:
          `public int add()
{
  int x = 3;
  for (int j = 0; j<3; j++)
  {
    x+=j;
  }
  return x + Integer.valueOf(System.getenv("environment_integer"));
}`,
        languageHighlighting: 'java'
      },
      {
        type: 'code',
        content: `add :: Int -> [(Char, Int)]
  add x =
    let xs = [1 .. x]
    zs = ['a','b','c']
    in
    zip zs $ map (\\x -> x+3) xs`,
        languageHighlighting: ''
      },
      {
        type: 'code',
        content: 'def add() = (1 to scala.io.StdIn.readInt()).map(x => x+1*3);',
        languageHighlighting: 'scala'
      }
    ],
    options: {
      type: 'radio',
      correctIndex: [2],
    }
  } as Question
} as const;
