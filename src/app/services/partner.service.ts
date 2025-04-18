import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://api.wosh.co.il/api/administrator/getAllPartners';

  getAllPartners(): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyVHlwZSI6IkFkbWluaXN0cmF0b3IiLCJ1c2VyIjoie1wiaWRcIjpcIjY4NGVjODVlLWRjNjUtNDRjNi1iNGFjLWZlN2YyOTI3NmE1ZFwiLFwibmFtZVwiOlwiV29zaC1BZG1pblwiLFwiZW1haWxcIjpcImFkbWluQHdvc2guY28uaWxcIixcInV0Y1RpbWVab25lT2Zmc2V0XCI6XCJaXCIsXCJpc0FkbWluXCI6ZmFsc2UsXCJpc0FwcHJvdmVkXCI6dHJ1ZSxcImlzU3VzcGVuZGVkXCI6ZmFsc2UsXCJwaG9uZU51bWJlclwiOlwiMDUyMDAwMDAwMFwiLFwiaXNQaG9uZVZlcmlmaWVkXCI6XCJmYWxzZVwiLFwicm9sZVwiOlwiU3VwZXJBZG1pblwiLFwiZGlzcGxheU5hbWVcIjpcIldvc2gtQWRtaW5cIixcInVzZXJFeHRyYURldGFpbHNcIjpudWxsfSIsImlzcyI6IlIuTGFicyJ9.A_cRfmPsBfu2acul3O55snrcVe4UnQnUqfatSwShPWk');
    return this.http.post<any[]>(this.apiUrl, {}, { headers });
  }
  
  
  
}
