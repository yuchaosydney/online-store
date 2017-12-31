import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as jwt_decode from 'jwt-decode';
import { User } from '../../models/user';

export const TOKEN_NAME = 'jwt_token';

@Injectable()
export class AuthService {

  private url = '/api/';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {
    // this.headers.append('Accept', 'application/json');
    // this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    this.headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
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

  login(user: User): Promise<string> {
    return this.http
    .post(`${this.url}authenticate`, JSON.stringify(user), { headers: this.headers })
    .toPromise()
    .then(res => res.text());
  }
}
