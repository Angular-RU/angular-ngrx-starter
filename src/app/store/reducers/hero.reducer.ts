import { Action } from '@ngrx/store';
import {
  EntityAdapter,
  createEntityAdapter,
  EntityState,
  Update
} from '@ngrx/entity';

import { Hero } from '../../models/hero';
import { HeroActions, HeroActionTypes } from '../actions/hero.actions';

export interface State extends EntityState<Hero> {
  loaded: boolean;
  loading: boolean;
  error: any;
  selectedHeroId: number;
  searchTerm: string;
  searchHeroes: Hero[];
}

export const adapter: EntityAdapter<Hero> = createEntityAdapter<Hero>();

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  selectedHeroId: null,
  error: null,
  searchTerm: '',
  searchHeroes: null
});

export function reducer(state = initialState, action: HeroActions): State {
  switch (action.type) {
    case HeroActionTypes.heroGetHeroes:
    case HeroActionTypes.heroAddHero:
    case HeroActionTypes.heroDeleteHero:
    case HeroActionTypes.heroUpdateHero:
    case HeroActionTypes.heroGetHeroById:
      return {
        ...state,
        loading: true
      };

    case HeroActionTypes.heroGetHeroesSuccess:
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });

    case HeroActionTypes.heroGetHeroByIdSuccess:
      return { ...state, selectedHeroId: action.payload.id, loading: false };

    case HeroActionTypes.heroAddHeroSuccess:
      return adapter.addOne(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });

    case HeroActionTypes.heroUpdateHeroSuccess: {
      return adapter.updateOne(
        {
          id: action.payload.id,
          changes: action.payload
        },
        {
          ...state,
          loading: false,
          loaded: true
        }
      );
    }

    case HeroActionTypes.heroDeleteHeroSuccess: {
      return adapter.removeOne(action.payload.id, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case HeroActionTypes.heroSearchHeroes:
      return {
        ...state,
        loading: true,
        searchTerm: action.payload
      };

    case HeroActionTypes.heroSearchHeroesSuccess:
      return {
        ...state,
        searchHeroes: action.payload,
        loading: false
      };

    case HeroActionTypes.heroSearchHeroesReset:
      return {
        ...state,
        searchTerm: '',
        searchHeroes: null
      };

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

export const heroEntitySelectors = adapter.getSelectors();
