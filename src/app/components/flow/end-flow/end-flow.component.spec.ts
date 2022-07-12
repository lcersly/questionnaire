import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EndFlowComponent} from './end-flow.component';

describe('EndFlowComponent', () => {
  let component: EndFlowComponent;
  let fixture: ComponentFixture<EndFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndFlowComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EndFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
