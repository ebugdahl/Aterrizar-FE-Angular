import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginFormComponent } from '../form/login-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginWrapperComponent } from './login-wrapper.component';

describe('LoginWrapperComponent', () => {
  let component: LoginWrapperComponent;
  let fixture: ComponentFixture<LoginWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginWrapperComponent, LoginFormComponent ],
      imports : [ RouterTestingModule, HttpClientTestingModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, NoopAnimationsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
