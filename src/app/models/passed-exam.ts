import { Course } from './course';

export interface PassedExam {
  username: string;
  course: Course;
  passedDate: string;
}
