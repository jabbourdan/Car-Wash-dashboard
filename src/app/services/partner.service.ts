import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private http: HttpClient) { }

  private apiUrl = '/api/administrator/getAllPartners';

  getAllPartners(): Observable<any[]> {
    const token = localStorage.getItem('authToken');  // جلب التوكن المخزن بعد تسجيل الدخول
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<any[]>(this.apiUrl, {}, { headers }).pipe(
      tap(response => {
        console.log('Partners response:', response);  // للتأكد من البيانات
      })
    );
  }
  
  
  
}
