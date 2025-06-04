import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserprofileService } from '../services/userprofile.service';
import { UserModel } from '../model/UserModel.1';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  user: UserModel |null=null;


  constructor(protected authService: AuthService,private userProfileService: UserprofileService) {

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

}
