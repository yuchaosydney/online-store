import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class ProductsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsFeatureState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(e => {
        console.log(e);
        return of(false);
      })
    );
  }

  checkStore(): Observable<boolean> {
    console.log('-----------loaded', this.store.select(fromStore.getAllProductsLoaded));

    return this.store.select(fromStore.getAllProductsLoaded).pipe(
      tap(loaded => {
        console.log('-----------loaded', loaded);
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadProductsAction());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

}
