import { Action } from '@ngrx/store';

import { Hero } from '../../models/hero';

export enum HeroActionTypes {
  heroGetHeroes = '[Hero] get',
  heroGetHeroesSuccess = '[Hero] get heroes success',
  heroAddHero = '[Hero] add hero',
  heroAddHeroSuccess = '[Hero] add hero success',
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

export class heroAddHeroSuccess implements Action {
  readonly type = HeroActionTypes.heroAddHeroSuccess;
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
  | heroAddHeroSuccess
  | HeroError;
