import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn:'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private router:Router

  ){}

  canActivate(): boolean{
    if(this.authService.isAuthenticated()){
      console.log(this.authService.getToken())
      return true;
    }else{
      this.router.navigate(['/login']);
      return false
    }
  }
  
};
