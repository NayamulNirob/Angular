import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';
import { catchError, map, Observable } from 'rxjs';
import { AuthResponse } from '../model/auth-response';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "http://localhost:3000/user";

  constructor(

    private http: HttpClient

  ) { }

  regitration(user: UserModel): Observable<AuthResponse> {

    return this.http.post<UserModel>(this.baseUrl, user).pipe(
      map((newUser: UserModel) => {
        const token = btoa(`${newUser.email}${newUser.password}`)
        return {token,user:newUser}as AuthResponse;
      })

    
    )
  }

login(credentials:{email:string;password:string}):Observable<AuthResponse>{

  let params=new HttpParams();
  params=params.append('email',credentials.email);

  return this.http.get<UserModel[]>(`${this.baseUrl}`,{params}).pipe(
    map(users=>{
      if(users.length > 0){
        const user=users[0];
        if(user.password === credentials.password){
          console.log(user.password);
          console.log(credentials.password);
          const token =btoa(`${user.email}:${user.password}`);
          return {token,user}as AuthResponse;
        }else{
          throw new Error('Invalid Password');
        }
      }else{
        throw new Error('User not found')
      }
    }),
    catchError(error=>{
      console.error('Login error',error);
      throw error;
    })
  );

}


logout():void{
  localStorage.removeItem('token');
}
storeToken(token:string):void{
  localStorage.setItem('token',token);
}

getToken():string|null{
  return localStorage.getItem('token');
}

}
