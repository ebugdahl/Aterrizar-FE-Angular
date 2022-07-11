import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { LoginModel } from '../../models/login-model';
import { AuthenticationService } from '../../services/authentication.service';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let loginModel = new LoginModel()
  loginModel.token = 'askld1u9023';

  var fakeAuthenticationService : AuthenticationService;

  beforeEach(async () => {

    fakeAuthenticationService = jasmine.createSpyObj('fakeAuthenticationService', {
      'LogIn' : of(loginModel)
    });

    await TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      providers: [
        {
          provide: AuthenticationService, useValue : fakeAuthenticationService
        }
      ],
      imports :[
        ReactiveFormsModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets username and password from sign-in form', () => {
    // Arrange
    component.loginForm.controls['username'].setValue('username');
    component.loginForm.controls['password'].setValue('password');

    // Act
    component.onSubmit();

    // Assert
    expect(fakeAuthenticationService.LogIn).toHaveBeenCalledWith('username', 'password');
  });

  it('display login error when login fails', () => {
    // Arrange
    component.loginForm.controls['username'].setValue('username');
    component.loginForm.controls['password'].setValue('password');
    let loginModel = null;
    fakeAuthenticationService.LogIn = jasmine.createSpy().and.returnValue(of(loginModel));

    // Act
    component.onSubmit();
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('#invalidCredentials'));

    // Assert
    expect(label.nativeElement.hidden).toBe(false);
  });
});