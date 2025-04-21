import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  constructor(private http: HttpClient) {}

  private apiUrl = '/api/administrator/getAllPartners';
  private apiUrlSuspend = '/api/administrator/suspendUser';
  private apiUrlPartnerExtraDetails = '/api/administrator/getPartnerExtraDetails';
  private apiUrlPartnerPackage = '/api/administrator/getPartnerPackages';

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllPartners(): Observable<any[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any[]>(this.apiUrl, {}, { headers }).pipe(
      tap((response) => {
        console.log('Partners response:', response);
      })
    );
  }

  suspendUser(userId: string, isSuspended: boolean) {
    const params = new HttpParams().set('userId', userId).set('isSuspended', isSuspended.toString());

    return this.http.post<any[]>(
      this.apiUrlSuspend,
      {},
      {
        headers: this.getAuthHeaders(),
        params: params // Attach params here
      }
    );
  }

  getPartnerExtraDetails(partnerId: string) {
    const url = `${this.apiUrlPartnerExtraDetails}?partnerId=${partnerId}`;
    return this.http.post<any>(url, {}, { headers: this.getAuthHeaders() });
  }

  gePartnerPackage(partnerId: string) {
    const url = `${this.apiUrlPartnerPackage}?partnerId=${partnerId}`;
    return this.http.post<any[]>(url, {}, { headers: this.getAuthHeaders() });
  }
}
