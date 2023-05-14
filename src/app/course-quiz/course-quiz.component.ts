import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionList } from '../models/questionList';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { Question } from '../models/questions';

@Component({
  selector: 'app-course-quiz',
  templateUrl: './course-quiz.component.html',
  styleUrls: ['./course-quiz.component.css'],
})
export class CourseQuizComponent implements OnInit {
  courseUrl = '/course';
  examPassUrl = '/exam/pass';
  id: string | null = '';

  questions: QuestionList | undefined;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      console.log('QUIZ URL/', val['id']);
      this.id = val['id'];
      this.http
        .get<QuestionList>(`course/${val['id']}`)
        .subscribe((val) => (this.questions = val));
    });
  }

  updateAnswer(
    optionsList: MatSelectionList,
    question: any,
    selectedOption: MatListOption
  ) {
    console.log(selectedOption.value + ' VAL');
    question.selectedAnswer = selectedOption.value;
    optionsList.deselectAll();
    optionsList.selectedOptions.select(selectedOption);
  }

  submit() {
    for (let i = 0; i < this.questions?.questionList.length!; i++) {
      if (
        this.questions?.questionList[i].selectedAnswer !=
        this.questions?.questionList[i].correctAnswer
      )
        return;
    }
    this.http
      .post(this.examPassUrl, {
        courseId: this.id,
        username: localStorage.getItem('user'),
      })
      .subscribe((resp) => console.log(resp));
  }
}
