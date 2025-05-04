import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = '/api/administrator/getAllCustomers';
  private apiUrlSuspend = '/api/administrator/suspendUser';

  constructor(private http: HttpClient) {}

  // private getAuthHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('authToken');
  //   return new HttpHeaders({
  //     Authorization: `Bearer ${token}`
  //   });
  // }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.post<any[]>(this.apiUrl, {}, {}).pipe(map((data) => data.map((json) => Customer.fromJson(json))));
  }

  suspendUser(userId: string, isSuspended: boolean) {
    const params = new HttpParams().set('userId', userId).set('isSuspended', isSuspended.toString());

    return this.http.post<any[]>(
      this.apiUrlSuspend,
      {},
      {
        params: params
      }
    );
  }
}
