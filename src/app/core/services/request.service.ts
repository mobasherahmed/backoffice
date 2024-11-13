import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

const API_URL = new InjectionToken<string>('API URL', {
  factory(): string {
    return environment.API_URL;
  },
});

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(
    @Inject(API_URL) private readonly url: string,
    @Inject(HttpClient) private readonly httpClient: HttpClient
  ) {}

  get<T>(
    path: string,
    params: HttpParams | Record<string, string | string[]> = {},
    responseType?: any 
  ): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${path}`, { params, responseType});
  }

  post<T, B>(path: string, body: B): Observable<T> {
    return this.httpClient.post<T>(`${this.url}/${path}`, body);
  }

  put<T, B>(path: string, body: B): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/${path}`, body);
  }
 
  patch<T, B>(path: string, body: B): Observable<T> {
    return this.httpClient.patch<T>(`${this.url}/${path}`, body);
  }

  delete<T, B>(path: string, body?: B): Observable<T> {
    return this.httpClient.delete<T>(`${this.url}/${path}`, { body });
  }

  download(path: string): Observable<Blob> {
    return this.httpClient.get(`${this.url}/${path}`, { responseType: 'blob' });
  }
}
