import { Component } from '@angular/core';
import { UserModel } from "../model/UserModel.1";
import { Subscription } from 'rxjs';
import { UserprofileService } from '../services/userprofile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {

  user: UserModel |null=null;
  private subscription:Subscription =new Subscription();

  constructor(
    private userProfileService: UserprofileService,
    private router: Router
  ) { }

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
    this.subscription.add(sub);

  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

}
