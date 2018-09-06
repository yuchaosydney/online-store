import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export const TOKEN_NAME = 'jwt_token';
export const AUTH_HEADER_KEY = 'x-access-token';
@Injectable()
export class HttpCallsService {

  private url = '/api/';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http, private requestOptions: RequestOptions) {
    this.headers = this.requestOptions.headers;
    this.headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem(TOKEN_NAME);
    if (token) {
      this.updateHeader(AUTH_HEADER_KEY, token);
    }
  }

  updateHeader (key: string, value: string): void {
    this.headers.append(key, value);
  }

  postRequest(path, obj): Observable<any> {
    return this.http
    .post(`${this.url}${path}`, JSON.stringify(obj), { headers: this.headers })
    .map(this.parseData)
    .catch(this.handleError);
  }

  postFormDataRequest(path, formData): Observable<any> {
    const headers = Object.assign(new Headers({}), this.headers);
    headers.delete('Content-Type');
    return this.http
    .post(`${this.url}${path}`, formData, { headers: headers })
    .map(this.parseData)
    .catch(this.handleError);
  }

  getRequest(path): Observable<any> {
    return this.http
    .get(`${this.url}${path}`, { headers: this.headers })
    .map(this.parseData)
    .catch(this.handleError);
  }

  putRequest(path, obj): Observable<any> {
    return this.http
      .put(`${this.url}${path}`, obj, { headers: this.headers })
      .map(this.parseData)
      .catch(this.handleError);
  }

  deleteRequest(path): Observable<any> {
    return this.http
      .delete(`${this.url}${path}`, { headers: this.headers })
      .map(this.parseData)
      .catch(this.handleError);
  }

  // This method parses the data to JSON
  private parseData(res: Response)  {
    return res.json() || [];
  }

  // Displays the error message
  private handleError(error: Response | any) {
    let errorMessage: string;

    errorMessage = error.message ? error.message : error.toString();

    // In real world application, call to log error to remote server
    // logError(error);

    // This returns another Observable for the observer to subscribe to
    return Observable.throw(errorMessage);
  }

}
