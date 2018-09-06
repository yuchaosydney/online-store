import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as fromPublicService from '../../../services';

@Injectable()
export class AuthService {

  constructor(private httpCallsService: fromPublicService.HttpCallsService) {}

  getToken(): string {
    return localStorage.getItem(fromPublicService.TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(fromPublicService.TOKEN_NAME, token);
    this.httpCallsService.updateHeader(fromPublicService.AUTH_HEADER_KEY, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  login(user: User): Observable<any> {
    return this.httpCallsService.postRequest('authenticate', user);
  }

}
