import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginModel } from '../../../models/login-model';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  private subjects : Subject<void> = new Subject();
  private readonly AUTH_TOKEN_LOCAL_STORAGE_KEY : string = 'aterrizar-auth-token';
  private readonly USER_LOCAL_STORAGE_KEY : string = 'user';

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', Validators.required)
  });

  invalidCredentialsLabelShown : boolean = false;

  constructor(private authenticationServer : AuthenticationService, private router : Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem(this.AUTH_TOKEN_LOCAL_STORAGE_KEY);
    if(token)
      this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subjects.next();
    this.subjects.complete();
  }

  onSubmit() : void {

    if(!this.loginForm.valid)
      return;

    this.invalidCredentialsLabelShown = false;

    let form = this.loginForm.getRawValue();

      this.authenticationServer.LogIn(form.email ?? '', form.password ?? '').pipe(takeUntil(this.subjects)).subscribe({
        next: response => {

          if(!response) {
            this.handleError();
          } else{
            this.hangleSuccessLogin(response);
          }

        },
        error : () => this.handleError()
      });

  }

  private hangleSuccessLogin(response : LoginModel) {
    this.authenticationServer.NotifyChanges(response);
    localStorage.setItem(this.AUTH_TOKEN_LOCAL_STORAGE_KEY, response.token);
    localStorage.setItem(this.USER_LOCAL_STORAGE_KEY, JSON.stringify(response));
    this.router.navigate(['/']);
  }

  private handleError() {
    this.invalidCredentialsLabelShown = true;
  }
}