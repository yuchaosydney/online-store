import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TOKEN_NAME } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    console.log('--------------', localStorage.getItem(TOKEN_NAME));
    if (localStorage.getItem(TOKEN_NAME)) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
