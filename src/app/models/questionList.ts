import { Question } from './questions';

export interface QuestionList {
  id: string;
  name: string;
  description: string;
  questionList: Question[];
}
