import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../model/UserModel.1';
import { UserprofileService } from '../services/userprofile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user: UserModel |null=null;


  constructor(protected authService: AuthService, private router: Router,private userProfileService: UserprofileService){

  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const sub = this.userProfileService.getUserProfile().subscribe({

      next: (user) => {
        if (user) {
          this.user = user;
        }
      },
      error: (err) => {
        console.error('Error Loading User Profile:', err);
      }
    });
   
  }

 

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
