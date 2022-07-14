import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { tap } from 'rxjs';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let fakeHttp : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthenticationService);
    fakeHttp = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login calls correct resource', () => {
    // Arrange
    const expectedPath : string = '/auth/login'

    // Act
    service.LogIn('username', 'password').subscribe();

    // Assert
    const req = fakeHttp.expectOne(request => request.url.indexOf(expectedPath) > 0);
    expect(req.request.method).toEqual("POST");
    req.flush({});
    fakeHttp.verify();
  });
});
