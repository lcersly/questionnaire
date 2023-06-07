import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageSubmitComponent} from './page-submit.component';

describe('PageFinishComponent', () => {
  let component: PageSubmitComponent;
  let fixture: ComponentFixture<PageSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PageSubmitComponent]
})
      .compileComponents();

    fixture = TestBed.createComponent(PageSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
