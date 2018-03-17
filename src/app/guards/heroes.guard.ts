import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromHeroReducer from '../store/reducers/hero.reducer';
import * as fromHeroActions from '../store/actions/hero.actions';
import * as fromSelectors from '../store/selectors';

@Injectable()
export class HeroesGuard implements CanActivate {
  constructor(private store: Store<fromHeroReducer.State>) {}

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
          this.store.dispatch(new fromHeroActions.GetHeroes());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
