import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UserModel } from '../model/user.model';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { AuthResponse } from '../model/auth-response';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "http://localhost:3000/user";

  private currentUserSubject: BehaviorSubject<UserModel | null>;
  public currentUser$: Observable<UserModel | null>;

  constructor(

    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object  // Injecting PLATFORM_ID to check if it's browser
  ) {
    const storeUser = this.isBrowser() ? JSON.parse(localStorage.getItem('currentUser') || 'null') : null;
    this.currentUserSubject = new BehaviorSubject<UserModel | null>(storeUser);
    this.currentUser$ = this.currentUserSubject.asObservable();

  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  regitration(user: UserModel): Observable<AuthResponse> {

    return this.http.post<UserModel>(this.baseUrl, user).pipe(
      map((newUser: UserModel) => {
        const token = btoa(`${newUser.email}${newUser.password}`)
        return { token, user: newUser } as AuthResponse;
      }),
      catchError(error => {
        console.error('Regitration error:', error);
        throw error;
      })

    );
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {

    let params = new HttpParams();
    params = params.append('email', credentials.email);

    return this.http.get<UserModel[]>(`${this.baseUrl}`, { params }).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];
          if (user.password === credentials.password) {
            const token = btoa(`${user.email}:${user.password}`);
            this.storeToken(token);
            this.setCurrentUser(user);
            return { token, user } as AuthResponse;
          } else {
            throw new Error('Invalid Password');
          }
        } else {
          throw new Error('User not found')
        }
      }),
      catchError(error => {
        console.error('Login error', error);
        throw error;
      })
    );

  }

  public get currentUserValue(): UserModel | null {
    return this.currentUserSubject.value;
  }


  logout(): void {
    this.clearCurrentuser();
    if(this.isBrowser()){
      localStorage.removeItem('token');
    }
  }

  private setCurrentUser(user: UserModel): void {

    if (this.isBrowser()) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);

  }

  private clearCurrentuser(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  isAuthenticated():boolean{
    return !!this.getToken();
  }

 

  getToken(): string | null {
    return this.isBrowser()? localStorage.getItem('token'):null;
  }

  getUserRole():any{
    return this.currentUserValue?.role;
  }

  storeToken(token: string): void {
    if(this.isBrowser()){
      localStorage.setItem('token', token);
    }
  }

  storeUserProfile(user: UserModel): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUserProfileFromStore(): UserModel | null {
    if(this.isBrowser()){
      const userProfile = localStorage.getItem('currentUser');
    return userProfile ? JSON.parse('currentUser') : null;
    }
    return null;
  }

  removeUserDetails():void {
    if(this.isBrowser()){
      localStorage.clear();
    }
  }

}
