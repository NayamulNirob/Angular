import { Component } from '@angular/core';
import { UserModel } from '../model/user.model';
import { UserprofileService } from '../service/userprofile.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { Subscription } from 'rxjs';

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
