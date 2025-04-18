import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  
  canActivate(): boolean {
    console.log('AuthGuard: Checking authentication status...');
    console.log('Is user logged in?', this.loginService.isLoggedIn());
    if (this.loginService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);  // Redirect unauthenticated users to login
      return false;
    }
  }
}
