import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromHeroReducer from '../reducers/hero.reducer';

export const getHeroStore = createFeatureSelector('hero');

export const getHeroEntities = createSelector(
  getHeroStore,
  fromHeroReducer.heroEntitySelectors.selectAll
);

export const getHeroes = createSelector(getHeroEntities, entities => {
  return Object.values(entities);
});

export const getTopHeroes = createSelector(getHeroEntities, entities => {
  return Object.values(entities).slice(1, 5);
});

export const getHeroesLoaded = createSelector(
  getHeroStore,
  (heroStore: fromHeroReducer.State) => heroStore.loaded
);

export const getHeroesLoading = createSelector(
  getHeroStore,
  (heroStore: fromHeroReducer.State) => heroStore.loading
);

export const getSelectedHeroId = createSelector(
  getHeroStore,
  (heroStore: fromHeroReducer.State) => heroStore.selectedHeroId
);

export const getSearchHeroes = createSelector(
  getHeroStore,
  (heroStore: fromHeroReducer.State) => heroStore.searchHeroes
);

export const getHeroById = createSelector(
  getHeroEntities,
  getSelectedHeroId,
  (entities, id) => entities.find(i => i.id === id)
);

export const getHeroesError = createSelector(
  getHeroStore,
  (heroStore: fromHeroReducer.State) => heroStore.error
);
