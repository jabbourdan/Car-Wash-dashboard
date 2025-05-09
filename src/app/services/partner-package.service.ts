// services/partner-package.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PartnerPackage } from '../models/partnerPackage';

@Injectable({
  providedIn: 'root'
})
export class PartnerPackageService {
  private baseUrl = '/api/administrator';

  constructor(private http: HttpClient) {}

  addPartnerPackage(partnerId: string, packageData: PartnerPackage) {
    const params = new HttpParams().set('partnerId', partnerId);
    return this.http.post(`${this.baseUrl}/addPartnerPackage`, packageData.toJson(), { params });
  }
}
