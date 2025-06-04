import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserModel } from "../model/UserModel.1";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {
  // private baseUrl="http://localhost:3000/user";

  private baseUrl="http://localhost:8089/api/user";

  constructor(
    private http:HttpClient,
    private authService:AuthService,
    
  ) { }


  getUserProfile():Observable<UserModel|null>{
    return of(this.authService.getUser());
  }

  updateUserProfile(user:UserModel):Observable<UserModel>{
    localStorage.setItem('userProfile',JSON.stringify(user));
    return this.http.put<UserModel>(`${this.baseUrl}/${user.id}`,user);
  }
  


  getAllUser(): Observable<any> {
    return this.http.get(this.baseUrl + "/");
  }

  addUser(user:UserModel,image:File):Observable<any>{

    const fromData= new FormData(); 

    fromData.append('USER',new Blob([JSON.stringify(user)],{type:'application/json'}));
    fromData.append('image',image);

    return this.http.post(this.baseUrl+"/save",fromData);
  }



  

}
