import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';
import { PartnerPackage, RegionDto, ServiceProduct } from '../models/test';

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

  // addPartnerPackage(idpartner: string, partnerPackage: PartnerPackage): Observable<any> {
  //   console.log('service:', partnerPackage);
  //   console.log('id service:', partnerPackage);
  //   const url = `${this.apiUrladdPartnerPackage}?partnerId=${idpartner}`;
  //   return this.http
  //     .post<any>(
  //       url,
  //       partnerPackage.toJson(), // request body
  //       {}
  //     )
  //     .pipe(
  //       tap((response) => {
  //         console.log('Add Partner Package response:', response);
  //       })
  //     );
  // }

  // addPartnerPackagee(partnerId: string, packageData: PartnerPackage) {
  //   const params = new HttpParams().set('partnerId', partnerId);
  //   return this.http.post(`${this.apiUrladdPartnerPackage}/addPartnerPackage`, packageData.toJson(), { params });
  // }

  getRegions(countryCode: string): Observable<RegionDto[]> {
    const params = new HttpParams().set('countryCode', countryCode);
    return this.http
      .post<RegionDto[]>(`${this.regionApi}`, {}, { params })
      .pipe(tap((response) => console.log('Regions response:', response)));
  }

  getServicesForRegion(region: RegionDto): Observable<any> {
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
}
