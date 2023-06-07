import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CodePageElementComponent} from './code-page-element.component';

describe('CodeAnswerOptionComponent', () => {
  let component: CodePageElementComponent;
  let fixture: ComponentFixture<CodePageElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CodePageElementComponent]
})
      .compileComponents();

    fixture = TestBed.createComponent(CodePageElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
