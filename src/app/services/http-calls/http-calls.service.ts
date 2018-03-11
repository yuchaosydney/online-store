import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthRequestOptions } from '../auth/auth-request';

@Injectable()
export class HttpCallsService {

  private url = '/api/';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http, private requestOptions: RequestOptions) {
     this.headers = this.requestOptions.headers;
     this.headers.append('Content-Type', 'application/json');
  }

  postRequest(path, obj): Observable<any> {
    return this.http
    .post(`${this.url}${path}`, JSON.stringify(obj), { headers: this.headers })
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
      .put(`${this.url}${path}`, JSON.stringify(obj), { headers: this.headers })
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
