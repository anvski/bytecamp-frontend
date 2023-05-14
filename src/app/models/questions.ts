export interface Question {
  id: string;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  selectedAnswer: string | undefined;
  correctAnswer: string;
}
