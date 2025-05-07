import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { PartnerPackage } from '../models/partnerPackage';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  constructor(private http: HttpClient) {}

  private apiUrl = '/api/administrator/getAllPartners';
  private apiUrlSuspend = '/api/administrator/suspendUser';
  private apiUrlPartnerExtraDetails = '/api/administrator/getPartnerExtraDetails';
  private apiUrlPartnerPackage = '/api/administrator/getPartnerPackages';
  private apiUrladdPartnerPackage = '/api/administrator/addPartnerPackage';
  private regionApi = '';

  getAllPartners(): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl, {}, {}).pipe(
      tap((response) => {
        console.log('Partners response:', response);
      })
    );
  }

  // suspendUser(userId: string, isSuspended: boolean) {
  //   const params = new HttpParams().set('userId', userId).set('isSuspended', isSuspended.toString());

  //   return this.http.post<any[]>(
  //     this.apiUrlSuspend,
  //     {},
  //     {
  //       params: params
  //     }
  //   );
  // }

  getPartnerExtraDetails(partnerId: string) {
    const url = `${this.apiUrlPartnerExtraDetails}?partnerId=${partnerId}`;
    return this.http.post<any>(url, {}, {});
  }

  gePartnerPackage(partnerId: string) {
    const url = `${this.apiUrlPartnerPackage}?partnerId=${partnerId}`;
    return this.http.post<any[]>(url, {}, {});
  }

  addPartnerPackage(idpartner: number, partnerPackage: PartnerPackage): Observable<any> {
    console.log('service:', partnerPackage);
    console.log('id service:', partnerPackage);
    const url = `${this.apiUrladdPartnerPackage}?partnerId=${idpartner}`;
    return this.http
      .post<any>(
        url,
        partnerPackage, // request body
        {}
      )
      .pipe(
        tap((response) => {
          console.log('Add Partner Package response:', response);
        })
      );
  }
}
