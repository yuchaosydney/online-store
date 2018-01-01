import { Headers, Http, BaseRequestOptions } from '@angular/http';
import { TOKEN_NAME } from './auth.service';

const AUTH_HEADER_KEY = 'x-access-token';

export class AuthRequestOptions extends BaseRequestOptions {
  constructor() {
    super();
    const token = localStorage.getItem(TOKEN_NAME);
    if (token) {
      this.headers.append(AUTH_HEADER_KEY, `${token}`);
      console.log('AuthRequestOptions........', this.headers);
    }
  }
}
