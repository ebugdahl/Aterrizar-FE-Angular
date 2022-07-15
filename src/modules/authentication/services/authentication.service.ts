import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginModel } from '../models/login-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{

  public loginSubject : BehaviorSubject<LoginModel> = new  BehaviorSubject({email : '', firstName : '', id : '', lastName : '', token : ''});
  private readonly BASE_URL : string = environment.api_url;
  private readonly RESOURCE : string = '/auth/login'

  constructor(private httpClient : HttpClient) {}

  LogIn(username : string, password: string ) : Observable<LoginModel> {
    return this.httpClient.post<LoginModel>(this.BASE_URL + this.RESOURCE, {email: username, password : password});
  }

  NotifyChanges(loginModel : LoginModel) : void {
    this.loginSubject.next(loginModel);
  }
}
