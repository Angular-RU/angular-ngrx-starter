import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
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
  UpdateHeroSuccess,
  SearchHeroes,
  SearchHeroesSuccess
} from '../actions/hero.actions';
import { HeroService } from '../../services/hero.service';
import { switchMap, map, catchError, tap, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRouterActions from '../actions/router.actions';

@Injectable()
export class HeroEffects {
  constructor(private actions$: Actions, private heroService: HeroService) {}

  @Effect()
  loadHeroes$ = this.actions$.pipe(
    ofType(HeroActionTypes.heroGetHeroes),
    switchMap(() => this.heroService.getHeroes()),
    map(heroes => new GetHeroesSuccess(heroes)),
    catchError(error => of(new HeroError(error)))
  );

  @Effect()
  getHeroById$ = this.actions$.pipe(
    ofType(HeroActionTypes.heroGetHeroById),
    switchMap((action: GetHeroById) =>
      this.heroService.getHero(action.payload)
    ),
    map(hero => new GetHeroByIdSuccess(hero)),
    catchError(error => of(new HeroError(error)))
  );

  @Effect()
  addHero$ = this.actions$.pipe(
    ofType(HeroActionTypes.heroAddHero),
    switchMap((action: AddHero) => this.heroService.addHero(action.payload)),
    map(hero => new AddHeroSuccess(hero)),
    catchError(error => of(new HeroError(error)))
  );

  @Effect()
  updateHero$ = this.actions$.pipe(
    ofType(HeroActionTypes.heroUpdateHero),
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
  deleteHero$ = this.actions$.pipe(
    ofType(HeroActionTypes.heroDeleteHero),
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
  searchHeroes$ = this.actions$.pipe(
    ofType(HeroActionTypes.heroSearchHeroes),
    debounceTime(300),
    switchMap((action: SearchHeroes) =>
      this.heroService.searchHeroes(action.payload)
    ),
    map(heroes => new SearchHeroesSuccess(heroes)),
    catchError(error => of(new HeroError(error)))
  );

  @Effect()
  updateHeroSuccess$ = this.actions$.pipe(
    ofType(HeroActionTypes.heroUpdateHeroSuccess),
    map(hero => new fromRouterActions.Go({ path: ['/heroes'] }))
  );
}
