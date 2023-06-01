import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogSignupEditMultipleComponent} from './dialog-signup-edit-multiple.component';

describe('DialogDeleteComponent', () => {
  let component: DialogSignupEditMultipleComponent;
  let fixture: ComponentFixture<DialogSignupEditMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DialogSignupEditMultipleComponent]
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSignupEditMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
