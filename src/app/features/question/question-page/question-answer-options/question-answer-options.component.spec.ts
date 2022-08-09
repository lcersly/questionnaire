import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuestionAnswerOptionsComponent} from './question-answer-options.component';

describe('QuestionAnswersComponent', () => {
  let component: QuestionAnswerOptionsComponent;
  let fixture: ComponentFixture<QuestionAnswerOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionAnswerOptionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuestionAnswerOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
