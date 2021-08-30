import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ],
      declarations: [ LogInComponent ],
      providers: [ ]
    })
    .compileComponents().then( () => {
      fixture = TestBed.createComponent(LogInComponent);
      component = fixture.componentInstance;
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Attempt Log In', fakeAsync( () => {
    spyOn(component, 'Attempt_LogIn');
    
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(component.Attempt_LogIn).toHaveBeenCalled();
  }));
});
