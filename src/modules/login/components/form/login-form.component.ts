import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../../models/login-model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  invalidCredentialsLabelShown : boolean = false;

  constructor(private authenticationServer : AuthenticationService) { }

  ngOnInit(): void {

  }

  onSubmit() : void {

    this.invalidCredentialsLabelShown = false;

    let form = this.loginForm.getRawValue();

    this.authenticationServer.LogIn(form.username ?? '', form.password ?? '').subscribe(response => {
      this.checkResponse(response);
    });
  }
  private checkResponse(response: LoginModel) {
    console.log(response.token);
    if(!response.token){
      this.handleError();
      return;
    }

    alert('Welcome');
  }


  private handleError() {
    this.invalidCredentialsLabelShown = true;
  }
}

