import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';

import * as fromReducers from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import { GetHeroes } from '@appStore/actions/hero.actions';
import { EntityServices, EntityCollectionService } from 'ngrx-data';
import { Hero } from '@appModels/hero';

@Injectable()
export class HeroesGuard implements CanActivate {
  heroesService: EntityCollectionService<Hero>;

  constructor(entityServices: EntityServices) {
    this.heroesService = entityServices.getEntityCollectionService('Hero');
  }

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
    return this.heroesService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.heroesService.getAll();
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
