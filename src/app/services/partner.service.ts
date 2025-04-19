import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private http: HttpClient) { }

  private apiUrl = '/api/administrator/getAllPartners';
  private apiUrlSuspend = '/api/administrator/suspendUser';


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  

  getAllPartners(): Observable<any[]> {
    const token = localStorage.getItem('authToken');  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<any[]>(this.apiUrl, {}, { headers }).pipe(
      tap(response => {
        console.log('Partners response:', response); 
      })
    );
  }
  
  
  suspendUser(userId: number, isSuspended: boolean) {
    const params = new HttpParams()
      .set('userId', userId.toString()) // Convert userId to string
      .set('isSuspended', isSuspended.toString()); // Convert isSuspended to string
    
    return this.http.post<any[]>(this.apiUrlSuspend, {}, { 
      headers: this.getAuthHeaders(), 
      params: params // Attach params here
    });
  }
  
}
