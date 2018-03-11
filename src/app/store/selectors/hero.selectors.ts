import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromHeroReducer from '../reducers/hero.reducer';

export const getHeroStore = createFeatureSelector('hero');

export const getHeroEntities = createSelector(
  getHeroStore,
  (heroStore: fromHeroReducer.State) => heroStore.entities
);

export const getHeroes = createSelector(getHeroEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

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
