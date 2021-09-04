import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteUsersComponent } from './admin-delete-users.component';

describe('AdminDeleteUsersComponent', () => {
  let component: AdminDeleteUsersComponent;
  let fixture: ComponentFixture<AdminDeleteUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeleteUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
