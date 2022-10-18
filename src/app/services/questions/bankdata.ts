import {Question} from "../../models/question.model";

export const QuestionsBankdata = {
  'what-does-bankdata-do': {
    question: [
      {
        type: 'simple-text',
        content: 'Hvad laver Bankdata?'
      },
    ],
    answers: [
      {
        type: 'simple-text',
        content: 'It-løsninger til 1,6 millioner danskere'
      },
      {
        type: 'simple-text',
        content: 'It-løsninger til pølsevogne'
      },
      {
        type: 'simple-text',
        content: 'Bankernes svar på TikTok'
      },
      {
        type: 'simple-text',
        content: 'Kriminelle it-løsninger som sælges på dark web'
      },
    ],
    options: {
      type: 'radio',
      correctIndex: [0],
    }
  } as Question,
  "the-whole-person": {
    question: [
      {
        type: 'simple-text',
        content: 'Hvad betyder det, at Bankdata har fokus på Det Hele Menneske?'
      }
    ],
    answers: [
      {
        type: 'simple-text',
        content:
          'at vi har fokus på, at medarbejdere ikke kommer til skade',
      },
      {
        type: 'simple-text',
        content:
          'at vi har fokus på medarbejdernes work-life balance',
      },
      {
        type: 'simple-text',
        content:
          'at vi har fokus på at medarbejderne er fuldt og helt til rådighed 24/7/365',
      },
    ],
    options: {
      type: 'radio',
      correctIndex: [1],
    }
  } as Question,
  "devops-mindset":{
    question: [
      {
        type: 'simple-text',
        content: 'Bankdatas it-teams arbejder ud fra et DevOps mindset. Hvad står DevOps for?'
      }
    ],
    answers: [
      {
        type: 'simple-text',
        content:
          'Developers with Opinions',
      },
      {
        type: 'simple-text',
        content:
          'Development and Obstacles',
      },
      {
        type: 'simple-text',
        content:
          'Development and Operations',
      },
    ],
    options: {
      type: 'radio',
      correctIndex: [2],
    }
  } as Question,
  "working-expectations":{
    question: [
      {
        type: 'simple-text',
        content: 'Hvad kan du forvente som fuldtidsansat hos Bankdata?'
      }
    ],
    answers: [
      {
        type: 'simple-text',
        content:
          '7 ugers ferie, 36 timers arbejdsuge med flex, fuldt udstyret hjemmearbejdsplads og et fællesskab med 800 andre it-faglige',
      },
      {
        type: 'simple-text',
        content:
          'En dedikeret ledelse, 6 måneders onboarding og bankfordele',
      },
      {
        type: 'simple-text',
        content:
          'Socialt fællesskab med dine kolleger i dagligdagen og interessefællesskaber, f.eks. sportsklub, vinklub, kunstklub, brætspilsklub mv.',
      },
    ],
    options: {
      type: 'radio',
      correctIndex: [0,1,2],
    }
  } as Question
} as const;
