import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTripButtonComponent } from './add-trip-button.component';

describe('AddTripButtonComponent', () => {
  let component: AddTripButtonComponent;
  let fixture: ComponentFixture<AddTripButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTripButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTripButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
