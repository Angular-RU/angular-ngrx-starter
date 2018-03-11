import { Action } from '@ngrx/store';

import { Hero } from '../../models/hero';
import { HeroActions, HeroActionTypes } from '../actions/hero.actions';

export interface State {
  loaded: boolean;
  loading: boolean;
  entities: { [id: number]: Hero };
  error: any;
}

export const initialState: State = {
  loaded: false,
  loading: false,
  entities: {},
  error: null
};

export function reducer(state = initialState, action: HeroActions): State {
  switch (action.type) {
    case HeroActionTypes.heroGetHeroes:
    case HeroActionTypes.heroAddHero:
    case HeroActionTypes.heroDeleteHero:
      return {
        ...state,
        loading: true
      };

    case HeroActionTypes.heroGetHeroesSuccess:
      const entities = action.payload.reduce(
        (entities: { [id: number]: Hero }, hero: Hero) => {
          return {
            ...entities,
            [hero.id]: hero
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };

    case HeroActionTypes.heroAddHeroSuccess: {
      const entities = {
        ...state.entities,
        [action.payload.id]: action.payload
      };
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case HeroActionTypes.heroDeleteHeroSuccess: {
      const entities = { ...state.entities };
      delete entities[action.payload.id];
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case HeroActionTypes.heroError:
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
