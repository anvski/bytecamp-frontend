import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from './models/token';
import { BehaviorSubject, Observable, first, map } from 'rxjs';
import { UserRegister } from './models/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl = '/auth/login';
  registerUrl = '/auth/register';
  isAuthenticated = localStorage.getItem('user') ? true : false;
  token = new BehaviorSubject<string | null>(localStorage.getItem('user'));

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<Token> {
    return this.http
      .post<Token>(this.loginUrl, {
        username: username,
        password: password,
      })
      .pipe(
        map((response) => {
          if (response) this.isAuthenticated = true;
          localStorage.setItem('user', response.username);
          this.token.next(response.username);
          return response;
        })
      );
  }

  register(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
  ) {
    return this.http
      .post<UserRegister>(this.registerUrl, {
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
      })
      .pipe(
        map((response) => {
          if (response) this.isAuthenticated = true;
          localStorage.setItem('user', response.username);
          this.token.next(response.username);
          return response;
        })
      );
  }

  signOut() {
    localStorage.removeItem('user');
    this.token.next(null);
    this.isAuthenticated = false;
  }
}
