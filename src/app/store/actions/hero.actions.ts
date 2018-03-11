import { Action } from '@ngrx/store';

import { Hero } from '../../models/hero';

export enum HeroActionTypes {
  heroGetHeroes = '[Hero] get',
  heroGetHeroesSuccess = '[Hero] get heroes success',
  heroAddHero = '[Hero] add hero',
  heroAddHeroSuccess = '[Hero] add hero success',
  heroDeleteHero = '[Hero] delete hero',
  heroDeleteHeroSuccess = '[Hero] delete hero success',
  heroError = '[Hero] error'
}

export class HeroGetHeroes implements Action {
  readonly type = HeroActionTypes.heroGetHeroes;
}

export class HeroGetHeroesSuccess implements Action {
  readonly type = HeroActionTypes.heroGetHeroesSuccess;
  constructor(public payload: Hero[]) {}
}

export class HeroAddHero implements Action {
  readonly type = HeroActionTypes.heroAddHero;
  constructor(public payload: Hero) {}
}

export class HeroAddHeroSuccess implements Action {
  readonly type = HeroActionTypes.heroAddHeroSuccess;
  constructor(public payload: Hero) {}
}

export class HeroDeleteHero implements Action {
  readonly type = HeroActionTypes.heroDeleteHero;
  constructor(public payload: Hero) {}
}

export class HeroDeleteHeroSuccess implements Action {
  readonly type = HeroActionTypes.heroDeleteHeroSuccess;
  constructor(public payload: Hero) {}
}

export class HeroError implements Action {
  readonly type = HeroActionTypes.heroError;
  constructor(public payload: any) {}
}

export type HeroActions =
  | HeroGetHeroes
  | HeroGetHeroesSuccess
  | HeroAddHero
  | HeroAddHeroSuccess
  | HeroDeleteHero
  | HeroDeleteHeroSuccess
  | HeroError;
