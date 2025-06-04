

// registration.service.ts  
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable, of } from 'rxjs';  
import { AuthService } from './auth.service';
import { UserModel } from "../model/UserModel.1";

@Injectable({  
  providedIn: 'root'  
})  
export class RegistrationService {  

  private baseUrl = "http://localhost:3000/user"; // Replace with your actual API endpoint  

  constructor(private http: HttpClient,
    private autthServices:AuthService
  ) { }  
  getUserProfile():Observable<UserModel|null>{
    return of(this.autthServices.getUserProfileFromStore());
  }

  updateUserProfile(user:UserModel):Observable<UserModel>{
    localStorage.setItem('userProfile',JSON.stringify(user));
    return this.http.put<UserModel>(`${this.baseUrl}/${user.id}`,user);
  }
}