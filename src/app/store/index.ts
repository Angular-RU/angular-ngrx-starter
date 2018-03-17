import { Type } from '@angular/core';

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

import { environment } from '../../environments/environment';

import * as fromReducers from './reducers';

import { HeroEffects } from './effects/hero.effects';
import { RouterEffects } from './effects/router.effects';
import { SearchEffects } from './effects/search.effects';

import { RouterStateUrl } from './router';

export interface State {
  hero: fromReducers.hero.State;
  search: fromReducers.search.State;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  hero: fromReducers.hero.reducer,
  search: fromReducers.search.reducer,
  router: routerReducer
};

export const effects = [HeroEffects, SearchEffects, RouterEffects];

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
