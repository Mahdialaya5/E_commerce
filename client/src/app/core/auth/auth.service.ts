import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

interface UserLogin {
  email: string;
  password: string;
}
interface user {
  email: string;
  id: number;
  photo: string;
  role: string;
  user_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private readonly cookieName = 'token';
  private url: string = 'http://localhost:3000/api/user';
  currentuser: user | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  login(data: UserLogin) {
    return this.http
      .post<{ token: string }>(`${this.url}/login`, data, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.isAuthenticated.next(true);
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  getCurrentUser() {
    return this.http
      .get<{ data: any }>(`${this.url}/current`, {
        withCredentials: true,
      })
      .pipe(
        tap((response: any) => {
          this.currentuser = response;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  logout() {
    this.cookieService.delete(this.cookieName, '/');
    this.isAuthenticated.next(false);
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    const tokenExists = this.cookieService.check(this.cookieName);
    this.isAuthenticated.next(tokenExists);
    return this.isAuthenticated.asObservable();
  }
}
