import { Action } from '@ngrx/store';
import { SearchActionTypes, SearchActions } from '../actions/search.actions';

export interface State {
  search: string;
}

export const initialState: State = {
  search: ''
};

export function reducer(state = initialState, action: SearchActions): State {
  switch (action.type) {
    case SearchActionTypes.Search:
      return {
        ...state,
        search: action.payload
      };

    case SearchActionTypes.SearchReset:
      return {
        ...state,
        search: ''
      };

    default:
      return state;
  }
}
