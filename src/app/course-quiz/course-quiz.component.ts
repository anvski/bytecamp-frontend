import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionList } from '../models/questionList';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { QuizResultsComponent } from './modals/quiz-results/quiz-results.component';
import { PassedExam } from '../models/passed-exam';

@Component({
  selector: 'app-course-quiz',
  templateUrl: './course-quiz.component.html',
  styleUrls: ['./course-quiz.component.css'],
})
export class CourseQuizComponent implements OnInit {
  courseUrl = '/course';
  examPassUrl = '/exam/pass';
  passed: boolean | undefined;
  id: string | null = '';
  correctAnswers = 0;
  checkPassedUrl = '/exam/check';
  result: PassedExam | undefined;

  questions: QuestionList | undefined;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private _sheet: MatBottomSheet
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.id = val['id'];
      if (!localStorage.getItem('user')) {
        this.router.navigate(['/home/courses/', this.id]);
      } else {
        this.http
          .get<PassedExam>(
            `${this.checkPassedUrl}/${this.id}/${localStorage.getItem('user')}`
          )
          .subscribe((result) => {
            if (result) this.result = result;
          });
      }
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
    question.selectedAnswer = selectedOption.value;
    optionsList.deselectAll();
    optionsList.selectedOptions.select(selectedOption);
  }

  submit() {
    this.correctAnswers = 0;
    for (let i = 0; i < this.questions?.questionList.length!; i++) {
      if (
        this.questions?.questionList[i].selectedAnswer ==
        this.questions?.questionList[i].correctAnswer
      )
        this.correctAnswers += 1;
    }
    if (this.correctAnswers != this.questions?.questionList.length) {
      this.passed = false;
      this._sheet.open(QuizResultsComponent, {
        data: {
          username: localStorage.getItem('user'),
          correctAnswers: this.correctAnswers,
          date: new Date(),
          passed: false,
        },
      });
      this._sheet._openedBottomSheetRef?.afterDismissed().subscribe((val) => {
        console.log(val);
      });
    } else {
      this.passed = true;
      this._sheet.open(QuizResultsComponent, {
        data: {
          username: localStorage.getItem('user'),
          correctAnswers: this.correctAnswers,
          date: new Date(),
          passed: true,
        },
      });
      this.http
        .post(this.examPassUrl, {
          courseId: this.id,
          username: localStorage.getItem('user'),
        })
        .subscribe((resp) => console.log(resp));
    }
    this._sheet._openedBottomSheetRef
      ?.afterDismissed()
      .subscribe(() => window.location.reload());
  }

  getParsedDate(dateAsStr: string): string {
    return new Date(Date.parse(dateAsStr)).toUTCString();
  }
}
