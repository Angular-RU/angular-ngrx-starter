import { Action } from '@ngrx/store';

export enum SearchActionTypes {
  Search = '[Search] Search',
  SearchReset = '[Search] Search reset'
}

export class Search implements Action {
  readonly type = SearchActionTypes.Search;
  constructor(public payload: string) {}
}

export class SearchReset implements Action {
  readonly type = SearchActionTypes.SearchReset;
}

export type SearchActions = Search | SearchReset;
