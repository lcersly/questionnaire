import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogQuizPickComponent} from './dialog-quiz-pick.component';

describe('DialogDeleteComponent', () => {
  let component: DialogQuizPickComponent;
  let fixture: ComponentFixture<DialogQuizPickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DialogQuizPickComponent]
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogQuizPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
