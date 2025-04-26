import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-login',
  imports: [ FormsModule,NgIf],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent {
  user = { email: '', password: '' };
  errorMessage = '';
  
  constructor(private loginService: LoginService, private router: Router, private authService:AuthService) {}
  
  onLogin(): void {
    this.loginService.login(this.user.email, this.user.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        if (response.token) {
          this.authService.login(response.token);    
          this.router.navigate(['/dashboard/default']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
