import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageThanksComponent} from './page-thanks.component';

describe('PageThanksComponent', () => {
  let component: PageThanksComponent;
  let fixture: ComponentFixture<PageThanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageThanksComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
