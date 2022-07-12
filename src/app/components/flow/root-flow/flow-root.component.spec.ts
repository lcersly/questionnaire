import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FlowRootComponent} from './flow-root.component';

describe('FlowComponent', () => {
  let component: FlowRootComponent;
  let fixture: ComponentFixture<FlowRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlowRootComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FlowRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
