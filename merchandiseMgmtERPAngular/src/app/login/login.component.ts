import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  logInFrom!: FormGroup;

  constructor(
    private router: Router,
    private fromBuilder: FormBuilder,
    private authService: AuthService

  ) {
    this.logInFrom = this.fromBuilder.group({
      email: [''],
      password: ['']

    });
  }

  loginWithFacebook(): void {
    window.location.href = 'https://www.facebook.com/v10.0/dialog/oauth?client_id=YOUR_FB_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=email';
  }

  loginWithGoogle(): void {
    window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token&scope=email';
  }

  onSubmit(): void {
    if (this.logInFrom.valid) {
      const credentials = this.logInFrom.value;
      this.authService.login(credentials.email, credentials.password).subscribe({
        next: (res) => {
          console.log("user log in successfully:");
          localStorage.setItem('authToken', res.token);
          this.router.navigate(['/userProfile']);
        },
        error: (err) => {

          console.error('Error Log In', err);
        }
      });
    }
    else {

      alert('Enter a valid username and password \nIf don`t have register now \nOr check your email activation');
    }

  }
}
