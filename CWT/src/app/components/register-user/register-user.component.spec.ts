import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RegisterUserComponent } from './register-user.component';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Register New Account', fakeAsync( () => {
    spyOn(component, 'RegisterNewAcct');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.RegisterNewAcct).toHaveBeenCalled();
  }));

  it('should call Reset Form', fakeAsync( () => {
    spyOn(component, 'ResetForm');  
    component.passwordConfirm1 = "RightTest";
    component.passwordConfirm2 = "WrongTest";
      
      
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.ResetForm).toHaveBeenCalled();
  }))

});
