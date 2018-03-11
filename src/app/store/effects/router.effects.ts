import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Effect, Actions } from '@ngrx/effects';
import * as fromRouterActions from '../actions/router.actions';

import { tap, map } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(fromRouterActions.RouterActionTypes.go).pipe(
    map((action: fromRouterActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
    .ofType(fromRouterActions.RouterActionTypes.back)
    .pipe(tap(() => this.location.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .ofType(fromRouterActions.RouterActionTypes.forward)
    .pipe(tap(() => this.location.forward()));
}
