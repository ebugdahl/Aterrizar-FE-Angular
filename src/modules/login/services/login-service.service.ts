import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginModel } from '../models/login-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  private BASE_URL : string = ''

  constructor(private httpClient : HttpClient) { }

  LogIn(username : string, password: string ) : Observable<LoginModel> {
    let loginModel = new LoginModel()
    loginModel.token = 'askld1u9023';
    return of(loginModel);
  }
}
