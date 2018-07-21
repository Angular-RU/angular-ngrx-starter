import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';

import * as fromReducers from './reducers';

import { RouterEffects } from '@appStore/effects/router.effects';

import { RouterStateUrl } from '@appStore/router';

export interface State {
  search: fromReducers.search.State;
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  search: fromReducers.search.reducer,
  router: routerReducer
};

export const effects = [ RouterEffects];

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];
