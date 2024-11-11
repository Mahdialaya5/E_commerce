import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

interface Edit{
  username:string;
  newpassword?:string;
  confirmpassword?:string;
}



@Injectable({
  providedIn: 'root',
  })

export class UserService {

  private apiUrl = 'http://localhost:3000/api/user'; 
  
     error: string | null = null;

  constructor( private http: HttpClient,  private router: Router) {}

  register(formData: FormData): Observable<any>{
      
    return this.http.post<any>(`${this.apiUrl}/register`,formData).pipe(
      tap(() => {
        confirm('register success please login');
            this.router.navigate(['/'])
           }),
      catchError((err) => {
        this.error = err.message
        throw err; 
      })
    );
  }
  

  updateUser(body:Edit): Observable<Edit> {
    return this.http.put<Edit>(`${this.apiUrl}/edit`,body);
  }


 /* getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(response => response) 
    );
  }*/

 /* getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }*/

 
}
