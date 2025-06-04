import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse } from '../model/AuthResponse';
import { UserModel } from '../model/UserModel.1';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8089';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userRole$: Observable<string | null> = this.userRoleSubject.asObservable();

  private currentUserSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  public currentUser$: Observable<UserModel | null> = this.currentUserSubject.asObservable();


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private router: Router
  ) {
    if (this.isBrowser()) {
      const storedRole = localStorage.getItem('userRole');
      this.userRoleSubject.next(storedRole);
      this.currentUserSubject.next(this.getUser());
    }
  }
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // decodeToken(token: string): any {
  //   const payload = token.split('.')[1];
  //   return JSON.parse(atob(payload));
  // }

  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  



  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password }, { headers: this.headers })
      .pipe(
        map((response: AuthResponse) => {
          if (this.isBrowser() && response.token) {
            localStorage.setItem('authToken', response.token);
            const decodedToken = this.decodeToken(response.token);
            localStorage.setItem('userRole', decodedToken.role);
            this.userRoleSubject.next(decodedToken.role);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }
          return response;
        })
      );
  }

  getUserRole(): string {
    if (this.isBrowser()) {
      let userRole = localStorage.getItem('userRole');
      if (userRole) {
        return userRole;
      }
      return '';
    }
    return '';
  }

  getUser(): UserModel | null {

    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  register(user: UserModel, image: File | null): Observable<AuthResponse> {
    const fromData= new FormData(); 

    fromData.append('user',new Blob([JSON.stringify(user)],{type:'application/json'}));
    if (image != null) {
      fromData.append('image', image);
    }

    
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, 
      fromData).pipe(
      map((response: AuthResponse) => {
        if (this.isBrowser() && response.token) {
          localStorage.setItem('authToken', response.token); // Store JWT token
          console.log(localStorage.getItem('authToken') + "***********************");
        }
        return response;
      })
    );
  }


  registerAdmin(user: { firstName: string; lastName: string, email: string; password: string; mobileNo: string; address: string; dob: Date; gender: string; image: string; nid: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register/admin`,
      user, { headers: this.headers }).pipe(
        map((response: AuthResponse) => {
          if (this.isBrowser() && response.token) {
            localStorage.setItem('authToken', response.token); // Store JWT token
            console.log(localStorage.getItem('authToken') + "admin");
          }
          return response;
        })
      );
  }
  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('authToken');
    }
    return null;
  }
  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    const expiry = decodedToken.exp * 1000;
    return Date.now() > expiry;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    }
    this.logout();
    return false;
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('user');
      this.userRoleSubject.next(null);
      this.currentUserSubject.next(null);
    }
    this.router.navigate(['/login']);
  }

  hasRole(roles: string): boolean {
    const userRole = this.getUserRole();
    return userRole ? roles.includes(userRole) : false;
  }

}