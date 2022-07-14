import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{

  private readonly BASE_URL : string = environment.api_url;
  private readonly RESOURCE : string = '/auth/login'

  constructor(private httpClient : HttpClient) { }

  LogIn(username : string, password: string ) : Observable<LoginModel> {
    return this.httpClient.post<LoginModel>(this.BASE_URL + this.RESOURCE, {email: username, password : password});
  }
}
