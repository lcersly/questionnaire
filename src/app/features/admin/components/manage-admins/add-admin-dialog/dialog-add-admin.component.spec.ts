import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogAddAdminComponent} from './dialog-add-admin.component';

describe('DialogDeleteComponent', () => {
  let component: DialogAddAdminComponent;
  let fixture: ComponentFixture<DialogAddAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddAdminComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
