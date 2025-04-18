import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  
  // Simulated login method
  login() {
    // Implement actual login logic using HTTP requests to authenticate
    this.isAuthenticated = true;
  }
  
  // Simulated logout method
  logout() {
    // Implement actual logout logic
    this.isAuthenticated = false;
  }
  
  // Method to check login status
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
