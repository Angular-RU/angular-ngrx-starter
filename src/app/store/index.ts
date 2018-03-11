import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromHeroReducer from './reducers/hero.reducer';

export interface State {
  hero: fromHeroReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  hero: fromHeroReducer.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
