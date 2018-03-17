import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromReducers from '../reducers';

export const getSearchStore = createFeatureSelector('search');

export const getSearch = createSelector(
  getSearchStore,
  (store: fromReducers.search.State) => store.search
);
