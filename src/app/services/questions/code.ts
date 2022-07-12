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
        highlighting: 'javascript'
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
        content: 'public int add()\n' +
          '{\n' +
          '    int x = 3;\n' +
          '    for (int j = 0; j<3; j++)\n' +
          '    {   \n' +
          '        x+=j;\n' +
          '    }\n' +
          '   return x + Integer.valueOf(System.getenv("environment_integer"));\n' +
          '}\n',
        highlighting: 'java'
      },
      {
        type: 'code',
        content: 'add :: Int -> [(Char, Int)]\n' +
          'add x = \n' +
          '    let xs = [1 .. x]\n' +
          '        zs = [\'a\',\'b\',\'c\']\n' +
          '   in\n' +
          '     zip zs $ map (\\x -> x+3) xs',
        highlighting: ''
      },
      {
        type: 'code',
        content: 'def add() =  (1 to scala.io.StdIn.readInt()).map(x => x+1*3);',
        highlighting: 'scala'
      }
    ],
    options: {
      type: 'radio',
      correctIndex: [2],
    }
  } as Question
} as const;
