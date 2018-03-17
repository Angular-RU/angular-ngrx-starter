import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { switchMap, catchError, tap, filter, take, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as fromHeroReducer from '../store/reducers/hero.reducer';
import * as fromHeroActions from '../store/actions/hero.actions';
import * as fromSelectors from '../store/selectors';
import { Hero } from '../models/hero';

@Injectable()
export class SelectedHeroGuard implements CanActivate {
  constructor(private store: Store<fromHeroReducer.State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore(+next.params['id']).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(id: number): Observable<boolean> {
    const loaded$: Observable<boolean> = this.store.select(
      fromSelectors.getHeroesLoaded
    );
    const selectedHeroId$: Observable<number> = this.store.select(
      fromSelectors.getSelectedHeroId
    );

    return combineLatest(loaded$, selectedHeroId$).pipe(
      tap(([loaded, selectedHeroId]) => {
        if (!loaded) {
          this.store.dispatch(new fromHeroActions.GetHeroes());
        }

        if (!selectedHeroId || selectedHeroId !== id) {
          this.store.dispatch(new fromHeroActions.GetHeroById(id));
        }
      }),
      filter(
        ([loaded, selectedHeroId]) =>
          loaded && selectedHeroId && selectedHeroId === id
      ),
      map(() => true),
      take(1)
    );
  }
}
