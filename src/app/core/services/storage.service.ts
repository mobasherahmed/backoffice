import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
// @TODO : If needed to check jwt token expiration, import jwt-decode
// import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router:Router,@Inject(PLATFORM_ID) private platformId: Object) {}

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      this.router.navigate(['/login']);
    }
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!this.getToken();
    }
    return false;
  }

  refreshToken(): Observable<string> {
    // Replace with your API endpoint and response handling
    return this.http.post<{ token: string }>('https://your-api-url.com/refresh', {}).pipe(
      tap(response => {
        this.setToken(response.token);
      }),
      map(response => response.token)
    );
  }

  // @TODO: Implement isTokenExpired method if needed
  // isTokenExpired(): boolean {
  //   const token = this.getToken();
  //   if (!token) return true;

  //   try {
  //     const decoded: { exp: number } = jwt_decode(token);
  //     const expirationDate = new Date(decoded.exp * 1000);
  //     return expirationDate < new Date();
  //   } catch (error) {
  //     return true; // Assume token is expired if decoding fails
  //   }
  // }
}
