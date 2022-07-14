import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginModel } from '../../models/login-model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  private subscriptions : Subscription[] = [];

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', Validators.required)
  });

  invalidCredentialsLabelShown : boolean = false;

  constructor(private authenticationServer : AuthenticationService, private router : Router) { }
  

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  onSubmit() : void {

    if(!this.loginForm.valid)
      return;

    this.invalidCredentialsLabelShown = false;

    let form = this.loginForm.getRawValue();

    this.subscriptions.push(
      this.authenticationServer.LogIn(form.email ?? '', form.password ?? '').subscribe({
        next: response => {

          if(!response) {
            this.handleError();
          } else{
            this.hangleSuccessLogin(response);
          }

        },
        error : () => this.handleError()
      })
    );

  }

  private hangleSuccessLogin(response : LoginModel) {
    localStorage.setItem('aterrizar-auth-token', response.token);
    this.router.navigate(['/']);
  }

  private handleError() {
    this.invalidCredentialsLabelShown = true;
  }
}