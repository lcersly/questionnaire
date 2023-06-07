import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogEditAdminComponent} from './dialog-edit-admin.component';

describe('DialogDeleteComponent', () => {
  let component: DialogEditAdminComponent;
  let fixture: ComponentFixture<DialogEditAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [DialogEditAdminComponent]
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
