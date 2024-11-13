import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../../core/services/request.service';
import { API_END_POINTS } from '../../core/enums/end-points.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private requestService : RequestService) { }

  login(body:{email: string, password: string}): Observable<any> {
    return this.requestService.post(API_END_POINTS.AUTH.LOGIN, body);
  }
}
