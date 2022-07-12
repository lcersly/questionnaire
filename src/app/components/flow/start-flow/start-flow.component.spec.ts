import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StartFlowComponent} from './start-flow.component';

describe('StartFlowComponent', () => {
  let component: StartFlowComponent;
  let fixture: ComponentFixture<StartFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartFlowComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StartFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
