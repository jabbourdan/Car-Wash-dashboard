import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = '/api/administrator';

  constructor(private http: HttpClient) {}

  approveUser(userId: string, isApproved: boolean) {
    const params = new HttpParams().set('userId', userId).set('isApproved', isApproved.toString());

    return this.http
      .post<any[]>(
        `${this.baseUrl}/approveUser`,
        {},
        {
          params: params
        }
      )
      .pipe(
        catchError((error) => {
          console.error('Error approving user', error);
          return throwError(() => new Error('Failed to approve user'));
        })
      );
  }

  suspendUser(userId: string, isSuspended: boolean) {
    const params = new HttpParams().set('userId', userId).set('isSuspended', isSuspended.toString());

    return this.http
      .post<any[]>(
        `${this.baseUrl}/suspendUser`,
        {},
        {
          params: params
        }
      )
      .pipe(
        catchError((error) => {
          console.error('Error suspending user', error);
          return throwError(() => new Error('Failed to suspend user'));
        })
      );
  }
}
