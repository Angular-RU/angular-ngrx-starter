import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';

import { HeroesService } from '@appServices/heroes.service';

@Injectable()
export class HeroesGuard implements CanActivate {
  constructor(private heroesService: HeroesService) {}

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
