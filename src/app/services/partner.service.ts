import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';
import { Regions } from '../models/regions';

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
  private regionApi = '/api/administrator/regions/get';
   private updateQuestionsApi = '/api/administrator/package/questions/update';
   private removePackageApi = '/api/administrator/removePartnerPackage';

  getAllPartners(): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl, {}, {}).pipe(
      tap((response) => {
        console.log('Partners response:', response);
      })
    );
  }


  getPartnerExtraDetails(partnerId: string) {
    const url = `${this.apiUrlPartnerExtraDetails}?partnerId=${partnerId}`;
    return this.http.post<any>(url, {}, {});
  }

  gePartnerPackage(partnerId: string) {
    const url = `${this.apiUrlPartnerPackage}?partnerId=${partnerId}`;
    return this.http.post<any[]>(url, {}, {});
  }

  getRegions(countryCode: string): Observable<Regions[]> {
    const params = new HttpParams().set('countryCode', countryCode);
    return this.http
      .post<Regions[]>(`${this.regionApi}`, {}, { params })
      .pipe(tap((response) => console.log('Regions response:', response)));
  }

  getServicesForRegion(region: Regions): Observable<any> {
    const body = [
      {
        id: region.id,
        countryCode: region.countryCode,
        country: region.country,
        city: region.city
      }
    ];

    return this.http
      .post<any>('/api/administrator/store/services/get', body)
      .pipe(tap((res) => console.log('Services for Region response:', res)));
  }

  addPartnerPackage(partnerId: string, packagePayload: any): Observable<any> {
    const url = `${this.apiUrladdPartnerPackage}?partnerId=${partnerId}`;
    return this.http.post<any>(url, packagePayload);
  }

updateQuestion(partnerId: string, packageId: string, questionUpdate: any[]): Observable<any> {
  const url = `${this.updateQuestionsApi}?partnerId=${partnerId}&packageId=${packageId}`;
  return this.http.post<any>(url, questionUpdate);
}

removePackage(packageId: string, partnerId: string): Observable<any> {
  const url = `${this.removePackageApi}?packageId=${packageId}&partnerId=${partnerId}`;
  return this.http.post<any>(url,null);
}



}
