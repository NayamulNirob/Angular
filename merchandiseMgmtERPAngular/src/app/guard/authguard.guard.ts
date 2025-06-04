import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { isPlatformBrowser } from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
     @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (this.authService.isLoggedIn()) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }
    // If not in browser, block navigation (or allow, depending on your SSR needs)
    return false;
  }

};
