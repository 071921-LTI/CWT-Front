import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewTripHistoryComponent } from './admin-view-trip-history.component';

describe('AdminViewTripHistoryComponent', () => {
  let component: AdminViewTripHistoryComponent;
  let fixture: ComponentFixture<AdminViewTripHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewTripHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewTripHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
