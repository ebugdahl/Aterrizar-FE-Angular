import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { LoginModel } from '../../../models/login-model';
import { AuthenticationService } from '../../../services/authentication.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './login-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let loginModel : LoginModel = 
  {
    token : 'askld1u9023',
    email : '',
    fistName : '',
    id : '',
    lastName : ''
  };
  var fakeAuthenticationService : AuthenticationService;
  let router: Router;

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
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();

    localStorage.clear();
    spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets username and password from sign-in form', () => {
    // Arrange
    component.loginForm.controls['email'].setValue('username@username.com');
    component.loginForm.controls['password'].setValue('password');

    // Act
    component.onSubmit();

    // Assert
    expect(fakeAuthenticationService.LogIn).toHaveBeenCalledWith('username@username.com', 'password');
  });

  it('username has to be a valid email', () => {
    // Arrange & Act
    component.loginForm.controls['email'].setValue('some@email.com');
    component.loginForm.controls['password'].setValue('somepassword');
    fixture.detectChanges();

    // Assert
    expect(component.loginForm.valid).toBeTrue();
  });

  it('email is required', () => {
    // Arrange & Act
    component.loginForm.controls['password'].setValue('somepassword');
    fixture.detectChanges();

    // Assert
    expect(component.loginForm.valid).toBeFalse();
  });

  it('password is required', () => {
    // Arrange & Act
    component.loginForm.controls['email'].setValue('some@email.com');
    fixture.detectChanges();
    
    // Assert
    expect(component.loginForm.valid).toBeFalse();
  });

  it('button is disabled if form is invalid', () => {
    // Arrange & Act
    component.loginForm.controls['email'].setValue('some@email.com');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('#submit_button'));
    
    // Assert
    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('button is enabled if form is valid', () => {
    // Arrange & Act
    component.loginForm.controls['email'].setValue('some@email.com');
    component.loginForm.controls['password'].setValue('somepassword');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('#submit_button'));
    
    // Assert
    expect(button.nativeElement.disabled).toBeFalse();
  });

  it('display login error when login fails', () => {
    // Arrange & Act
    component.loginForm.controls['email'].setValue('username@user.com');
    component.loginForm.controls['password'].setValue('password');
    let loginModel = null;
    fakeAuthenticationService.LogIn = jasmine.createSpy().and.returnValue(of(loginModel));
    component.onSubmit();
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('#invalid_credentials'));

    // Assert
    expect(label.nativeElement.hidden).toBe(false);
  });

  it('inserts token into local storage after login', () => {
    // Arrange
    component.loginForm.controls['email'].setValue('username@user.com');
    component.loginForm.controls['password'].setValue('password');
    fakeAuthenticationService.LogIn = jasmine.createSpy().and.returnValue(of(loginModel));
    
    // Act
    component.onSubmit();

    // Assert
    expect(localStorage.getItem('aterrizar-auth-token')).toBe(loginModel.token);
  });

  it('navigates to / after login', () => {
    // Arrange & Act
    component.loginForm.controls['email'].setValue('username@user.com');
    component.loginForm.controls['password'].setValue('password');
    fakeAuthenticationService.LogIn = jasmine.createSpy().and.returnValue(of(loginModel));
    
    // Act
    component.onSubmit();

    // Assert
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});