import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../../models/login-model';
import { LoginService} from '../../services/login-service.service';

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

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {

  }

  onSubmit() : void {

    let username = this.loginForm.controls['username'].value;
    let password = this.loginForm.controls['password'].value;

    this.loginService.LogIn('', '').subscribe(response => {
      this.checkResponse(response);
    });
  }
  private checkResponse(response: LoginModel) {
    if(!response.token)
      this.handleError('Login failed');

    alert('Welcome');
  }


  private handleError(err: any) {
    console.log(err);
  }
}

