import { Action } from '@ngrx/store';

import { Hero } from '../../models/hero';
import { HeroActions, HeroActionTypes } from '../actions/hero.actions';

export interface State {
  loaded: boolean;
  loading: boolean;
  heroes: Hero[];
  error: any;
}

export const initialState: State = {
  loaded: false,
  loading: false,
  heroes: [],
  error: null
};

export function reducer(state = initialState, action: HeroActions): State {
  switch (action.type) {
    case HeroActionTypes.heroGet:
      return {
        ...state,
        loading: true
      };

    case HeroActionTypes.heroGetSuccess:
      return {
        ...state,
        loading: false,
        loaded: true,
        heroes: action.payload
      };

    case HeroActionTypes.heroGetError:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };

    default:
      return state;
  }
}
