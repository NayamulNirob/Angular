import { Component } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginFrom!:FormGroup

constructor(
  private authservice:AuthService,
  private router:Router,
  private fromBuilder:FormBuilder
){
  this.loginFrom=this.fromBuilder.group({
    email:[''],
    password:['']
   
  });
}



onSubmit(): void {
  if (this.loginFrom.valid) {
    const credentials = this.loginFrom.value;
    this.authservice.login(credentials).subscribe({
      next: (res) => {
        console.log('User logged in successfully:', res);
        this.authservice.storeToken(res.token);
        const role =this.authservice.getUserRole();
        this.router.navigate(['/Userprofile']); 
      },
      error: (err) => {
        console.error('Error logging in:', err);
      }
    });
  }
}


}
