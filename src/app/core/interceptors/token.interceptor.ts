import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and add the authorization header if token is available
    const token = this.storageService.getToken();
    let authReq = req;

    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    // Handle the HTTP request
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error from interceptor', error);
        // Handle 401 errors - typically for token expiration
        if (error.status === 401) {
          return this.handle401Error(authReq, next);
        }
        // Other errors
        return throwError(() => error);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.storageService.refreshToken().pipe(
      switchMap((newToken: string) => {
        // Clone the request with the new token
        this.storageService.setToken(newToken);
        const newReq = req.clone({
          setHeaders: { Authorization: `Bearer ${newToken}` }
        });
        return next.handle(newReq);
      }),
      catchError(error => {
        // Logout or handle error if refresh token fails
        this.storageService.logout();
        return throwError(() => error);
      })
    );
  }
}


export function TokenInterceptorFn(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req.url);
   const storageService = inject(StorageService);
   // Clone the request and add the authorization header if token is available
   const token = storageService.getToken();
   let authReq = req;

   if (token) {
     authReq = req.clone({
       setHeaders: { Authorization: `Bearer ${token}` }
     });
   }
   
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('Error from interceptor', error);
      // Handle 401 errors - typically for token expiration
      if (error.status === 401) {
        return storageService.refreshToken().pipe(
          switchMap((newToken: string) => {
            // Clone the request with the new token
            storageService.setToken(newToken);
            const newReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` }
            });
            return next(newReq);
          }),
          catchError(error => {
            // Logout or handle error if refresh token fails
            storageService.logout();
            return throwError(() => error);
          })
        );
      }
      // Other errors
      return throwError(() => error);
    })
  );
}