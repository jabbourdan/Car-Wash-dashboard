import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = '/api/administrator/getAllCustomers';
  private apiUrlSuspend = '/api/administrator/suspendUser';

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<Customer[]> {
    return this.http.post<any[]>(this.apiUrl, {}, {}).pipe(
      map((data) => data.map(Customer.fromJson)),
      catchError((error) => {
        console.error('Error fetching customers', error);
        return throwError(() => new Error('Failed to load customers'));
      })
    );
  }
}
