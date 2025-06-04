import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // canActivate(): boolean{
  //   if(this.authService.isLoggedIn()){
  //     return true;
  //   }else{
  //     this.router.navigate(['/']);
  //     return false
  //   }
  // }

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  // canActivate(): boolean {
  //   if (isPlatformBrowser(this.platformId)) {
  //     const token = localStorage.getItem('authToken');
  //     if (token) {
  //       return true;
  //     }
  //   }
  //   this.router.navigate(['/login']);
  //   return false;
  // }

};
