import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromHeroReducer from '../reducers/hero.reducer';

export const getHeroStore = createFeatureSelector('hero');

export const getHeroes = createSelector(
  getHeroStore,
  (heroStore: fromHeroReducer.State) => heroStore.heroes
);

export const getHeroesLoaded = createSelector(
  getHeroStore,
  (heroStore: fromHeroReducer.State) => heroStore.loaded
);

export const getHeroesLoading = createSelector(
  getHeroStore,
  (heroStore: fromHeroReducer.State) => heroStore.loading
);

export const getHeroesError = createSelector(
  getHeroStore,
  (heroStore: fromHeroReducer.State) => heroStore.error
);
