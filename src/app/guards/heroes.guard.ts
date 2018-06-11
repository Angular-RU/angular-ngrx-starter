import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable ,  of } from 'rxjs';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';

import * as fromReducers from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import { GetHeroes } from '@appStore/actions/hero.actions';

@Injectable()
export class HeroesGuard implements CanActivate {
  constructor(private store: Store<fromReducers.hero.State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromSelectors.getHeroesLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new GetHeroes());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
