// login-service.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiBaseUrl = 'http://api.wosh.co.il/api/authorization/administrator/login';
  
  constructor(private http: HttpClient) { }
  
  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    
    return this.http.post<any>(`${this.apiBaseUrl}?${params.toString()}`, {});
  }
}