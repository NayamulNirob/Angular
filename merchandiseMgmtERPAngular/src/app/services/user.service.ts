import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserModel } from '../model/UserModel.1';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = "http://localhost:8089/api/user"

  constructor(
    private http: HttpClient,
    private authService:AuthService,
  ) { }

  getAllUser(): Observable<any> {
    return this.http.get(this.baseUrl + "/");
  }

  addUser(user:UserModel,image:File):Observable<any>{

    const fromData= new FormData(); 

    fromData.append('USER',new Blob([JSON.stringify(user)],{type:'application/json'}));
    fromData.append('image',image);

    return this.http.post(this.baseUrl+"/save",fromData);
  }

  
  getUserProfile():Observable<UserModel|null>{
    return of(this.authService.getUser());
  }

  updateUserProfile(user:UserModel):Observable<UserModel>{
    localStorage.setItem('userProfile',JSON.stringify(user));
    return this.http.put<UserModel>(`${this.baseUrl}/${user.id}`,user);
  }
}
