import { Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { QuizData } from '../data';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class QuizResultsComponent {
  constructor(
    private _failSheetRef: MatBottomSheetRef<QuizResultsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: QuizData
  ) {}

  closeSheet(event: MouseEvent): void {
    this._failSheetRef.dismiss(this.data);
    event.preventDefault();
  }
}
