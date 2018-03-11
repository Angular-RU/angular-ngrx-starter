import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  HeroActionTypes,
  HeroGetHeroesSuccess,
  HeroError,
  HeroAddHero,
  HeroAddHeroSuccess,
  HeroDeleteHeroSuccess,
  HeroDeleteHero,
  HeroGetHeroById,
  HeroGetHeroByIdSuccess
} from '../actions/hero.actions';
import { HeroService } from '../../services/hero.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HeroEffects {
  constructor(private actions$: Actions, private heroService: HeroService) {}

  @Effect()
  loadHeroes$ = this.actions$
    .ofType(HeroActionTypes.heroGetHeroes)
    .pipe(
      switchMap(() => this.heroService.getHeroes()),
      map(heroes => new HeroGetHeroesSuccess(heroes)),
      catchError(error => of(new HeroError(error)))
    );

  @Effect()
  getHeroById$ = this.actions$
    .ofType(HeroActionTypes.heroGetHeroById)
    .pipe(
      switchMap((action: HeroGetHeroById) =>
        this.heroService.getHero(action.payload)
      ),
      map(hero => new HeroGetHeroByIdSuccess(hero)),
      catchError(error => of(new HeroError(error)))
    );

  @Effect()
  addHero$ = this.actions$
    .ofType(HeroActionTypes.heroAddHero)
    .pipe(
      switchMap((action: HeroAddHero) =>
        this.heroService.addHero(action.payload)
      ),
      map(hero => new HeroAddHeroSuccess(hero)),
      catchError(error => of(new HeroError(error)))
    );

  @Effect()
  deleteHero$ = this.actions$
    .ofType(HeroActionTypes.heroDeleteHero)
    .pipe(
      switchMap((action: HeroDeleteHero) =>
        this.heroService
          .deleteHero(action.payload)
          .pipe(
            map(() => new HeroDeleteHeroSuccess(action.payload)),
            catchError(error => of(new HeroError(error)))
          )
      )
    );
}
