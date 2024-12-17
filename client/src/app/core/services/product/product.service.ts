import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.BaseURL}/api/product`;

  error: string | null = null;

  constructor(private http: HttpClient) {}

  getProducts(): any {
    return this.http
      .get<any>(`${this.apiUrl}/getproducts` )
      .pipe(map((response: any) => response));
  }

  getOneProducts(id: string | null): any {
    return this.http
      .get<any>(`${this.apiUrl}/oneproduct/${id}`)
      .pipe(map((response: any) => response));
  }

  getProductsbyCompany(id: string | null): any {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(map((response: any) => response));
  }

  getNumberProductsbyCompany(id: number): any {
    return this.http
      .get<any>(`${this.apiUrl}/numberproducts/${id}`)
      .pipe(map((response: any) => response));
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, formData).pipe(
      tap((res) => {
        res;
      }),
      catchError((err) => {
        this.error = err.message;
        throw err;
      })
    );
  }

  updateProduct(body: FormData, id: string | undefined): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, body);
  }

  deleteProduct(id: string | null): any {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
    .pipe(map((response: any) => response));
  }
  
  getNumberAllProducts(): any {
    return this.http
      .get<any>(`${this.apiUrl}/admin/numberproducts`)
      .pipe(map((response: any) => response));
  }

}
