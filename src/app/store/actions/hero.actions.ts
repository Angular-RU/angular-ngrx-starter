import { Action } from '@ngrx/store';

import { Hero } from '../../models/hero';

export enum HeroActionTypes {
  heroGet = '[Hero] get',
  heroGetSuccess = '[Hero] get success',
  heroGetError = '[Hero] get error'
}

export class HeroGet implements Action {
  readonly type = HeroActionTypes.heroGet;
}

export class HeroGetSuccess implements Action {
  readonly type = HeroActionTypes.heroGetSuccess;
  constructor(public payload: Hero[]){}
}

export class HeroGetError implements Action {
  readonly type = HeroActionTypes.heroGetError;
  constructor (public payload: any){}
}

export type HeroActions = HeroGet | HeroGetSuccess | HeroGetError;
