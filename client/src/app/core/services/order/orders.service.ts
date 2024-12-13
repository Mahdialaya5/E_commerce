import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = 'http://localhost:3000/api/order';

  error: string | null = null;

  constructor(private http: HttpClient) {}

  getOrdersCompany(): any {
    return this.http
      .get<any>(`${this.apiUrl}/company`)
      .pipe(map((response: any) => response));
  }

  getOrdersUser(): any {
    return this.http
      .get<any>(`${this.apiUrl}/user`)
      .pipe(map((response: any) => response));
  }
  getOrdersAdmin(): any {
    return this.http
      .get<any>(`${this.apiUrl}/admin/numberorders`)
      .pipe(map((response: any) => response));
  }
  getSumOrdersAdmin(): any {
    return this.http
      .get<any>(`${this.apiUrl}/admin/sumorders`)
      .pipe(map((response: any) => response));
  }
  getMostProductSeller(): any {
    return this.http
      .get<any>(`${this.apiUrl}/admin/mostproductseller`)
      .pipe(map((response: any) => response));
  }
  sendOrder(Data: object): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, Data);
  }
}
