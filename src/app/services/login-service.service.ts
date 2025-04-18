import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiBaseUrl = 'http://api.wosh.co.il/api/authorization/administrator/login';
  private loggedIn = false;  // Updated authentication status
  
  constructor(private http: HttpClient) { }
  
  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    
    return this.http.post<any>(`${this.apiBaseUrl}?${params.toString()}`, {}).pipe(
      tap(response => {
        console.log('Login response:', response.token);  // Log the response for debugging
        if (response.token) {  // Typically, your API response must indicate success
          this.loggedIn = true;
          localStorage.setItem('authToken', response.token);  // Example of token management
        }
      })
    );
  }
  
  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('authToken');
  }
  
  isLoggedIn(): boolean {
    return this.loggedIn;  // Checking logged-in state
  }
}
