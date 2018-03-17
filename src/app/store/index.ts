import { Type } from '@angular/core';

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';

import * as fromHeroReducer from './reducers/hero.reducer';
import * as fromSearchReducer from './reducers/search.reducer';

import { HeroEffects } from './effects/hero.effects';
import { RouterEffects } from './effects/router.effects';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

import { RouterStateUrl } from './router';
import { SearchEffects } from './effects/search.effects';

export interface State {
  hero: fromHeroReducer.State;
  search: fromSearchReducer.State;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  hero: fromHeroReducer.reducer,
  search: fromSearchReducer.reducer,
  router: routerReducer
};

export const effects = [HeroEffects, SearchEffects, RouterEffects];

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
