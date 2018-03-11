import { Type } from '@angular/core';

import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';

import * as fromHeroReducer from './reducers/hero.reducer';
import { HeroEffects } from './effects/hero.effects';

export interface State {
  hero: fromHeroReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  hero: fromHeroReducer.reducer
};

export const effects = [HeroEffects];

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
