import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogSignupPickedComponent} from './dialog-signup-picked.component';

describe('DialogDeleteComponent', () => {
  let component: DialogSignupPickedComponent;
  let fixture: ComponentFixture<DialogSignupPickedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DialogSignupPickedComponent]
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSignupPickedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
