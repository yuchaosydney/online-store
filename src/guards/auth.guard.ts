import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as fromPublicService from '../services';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem(fromPublicService.TOKEN_NAME)) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
