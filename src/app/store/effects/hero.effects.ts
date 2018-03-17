import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  HeroActionTypes,
  GetHeroesSuccess,
  HeroError,
  AddHero,
  AddHeroSuccess,
  DeleteHeroSuccess,
  DeleteHero,
  GetHeroById,
  GetHeroByIdSuccess,
  UpdateHeroSuccess
} from '../actions/hero.actions';
import { HeroService } from '../../services/hero.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRouterActions from '../actions/router.actions';

@Injectable()
export class HeroEffects {
  constructor(private actions$: Actions, private heroService: HeroService) {}

  @Effect()
  loadHeroes$ = this.actions$
    .ofType(HeroActionTypes.heroGetHeroes)
    .pipe(
      switchMap(() => this.heroService.getHeroes()),
      map(heroes => new GetHeroesSuccess(heroes)),
      catchError(error => of(new HeroError(error)))
    );

  @Effect()
  getHeroById$ = this.actions$
    .ofType(HeroActionTypes.heroGetHeroById)
    .pipe(
      switchMap((action: GetHeroById) =>
        this.heroService.getHero(action.payload)
      ),
      map(hero => new GetHeroByIdSuccess(hero)),
      catchError(error => of(new HeroError(error)))
    );

  @Effect()
  addHero$ = this.actions$
    .ofType(HeroActionTypes.heroAddHero)
    .pipe(
      switchMap((action: AddHero) =>
        this.heroService.addHero(action.payload)
      ),
      map(hero => new AddHeroSuccess(hero)),
      catchError(error => of(new HeroError(error)))
    );

  @Effect()
  updateHero$ = this.actions$
    .ofType(HeroActionTypes.heroUpdateHero)
    .pipe(
      switchMap((action: AddHero) =>
        this.heroService
          .updateHero(action.payload)
          .pipe(
            map(hero => new UpdateHeroSuccess(action.payload)),
            catchError(error => of(new HeroError(error)))
          )
      )
    );

  @Effect()
  deleteHero$ = this.actions$
    .ofType(HeroActionTypes.heroDeleteHero)
    .pipe(
      switchMap((action: DeleteHero) =>
        this.heroService
          .deleteHero(action.payload)
          .pipe(
            map(() => new DeleteHeroSuccess(action.payload)),
            catchError(error => of(new HeroError(error)))
          )
      )
    );

  @Effect()
  updateHeroSuccess$ = this.actions$
    .ofType(HeroActionTypes.heroUpdateHeroSuccess)
    .pipe(map(hero => new fromRouterActions.Go({
      path: ['/heroes']
    })));
}
