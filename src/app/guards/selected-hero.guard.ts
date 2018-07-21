import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of, combineLatest } from 'rxjs';
import { switchMap, catchError, tap, filter, take, map } from 'rxjs/operators';


@Injectable()
export class SelectedHeroGuard implements CanActivate {
  constructor() {}

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
    return of(true);
    // const loaded$: Observable<boolean> = this.store.select(
    //   fromSelectors.getHeroesLoaded
    // );
    // const selectedHeroId$: Observable<number> = this.store.select(
    //   fromSelectors.getSelectedHeroId
    // );

    // return combineLatest(loaded$, selectedHeroId$).pipe(
    //   tap(([loaded, selectedHeroId]) => {
    //     if (!loaded) {
    //       this.store.dispatch(new GetHeroes());
    //     }

    //     if (!selectedHeroId || selectedHeroId !== id) {
    //       this.store.dispatch(new GetHeroById(id));
    //     }
    //   }),
    //   filter(
    //     ([loaded, selectedHeroId]) =>
    //       loaded && selectedHeroId && selectedHeroId === id
    //   ),
    //   map(() => true),
    //   take(1)
    // );
  }
}
