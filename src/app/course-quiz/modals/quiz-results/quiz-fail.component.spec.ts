import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFailComponent } from './quiz-results.component';

describe('QuizFailComponent', () => {
  let component: QuizFailComponent;
  let fixture: ComponentFixture<QuizFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizFailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
