import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';


interface Edit {
  username: string;
  newpassword?: string;
  confirmpassword?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.BaseURL}/api/user`;

  error: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  register(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, formData).pipe(
      tap(() => {
        confirm('register success please login');
        this.router.navigate(['/']);
      }),
      catchError((err) => {
        this.error = err.message;
        throw err;
      })
    );
  }

  updateUser(body: Edit): Observable<Edit> {
    return this.http.put<Edit>(`${this.apiUrl}/edit`, body);
  }
  updateUserPhoto(body: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit/photo`, body);
  }

  getCompany(): any {
    return this.http.get<any>(`${this.apiUrl}/getcompany`).pipe(map((response: any) => response));
  }
  getCompanyForAdmin(): any {
    return this.http.get<any>(`${this.apiUrl}/admin/getcompany`).pipe(map((response: any) => response));
  }
  getUsers(): any {
    return this.http.get<any>(`${this.apiUrl}/admin/getuser`).pipe(map((response: any) => response));
  }
}
