import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSearchReducer from '../reducers/search.reducer';

export const getSearchStore = createFeatureSelector('search');

export const getSearch = createSelector(
  getSearchStore,
  (store: fromSearchReducer.State) => store.search
);
