import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';



interface UserLogin{
  email:string;
  password:string;
}


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private readonly cookieName = 'token'; 
   currentuser:any

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}

  login(data: UserLogin) {
    return this.http.post<{ token: string }>('http://localhost:3000/api/user/login', data,{ 
      withCredentials: true 
   }).pipe(
      tap(response => {
        this.isAuthenticated.next(true);
      }),
      catchError(err => {
          throw err;
      })
    );
  }
  
  getCurrentUser(){
    
     return this.http.get<{ data: any }>('http://localhost:3000/api/user/current', {
      withCredentials: true 
    }).pipe(
        tap(response => {
          this.currentuser=response
        }),
        catchError(err => {
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
