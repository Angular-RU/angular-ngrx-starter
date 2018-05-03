import { TestBed } from '@angular/core/testing';
import {
  SearchHeroes,
  SearchHeroesReset,
  AddHero
} from '@appStore/actions/hero.actions';
import { Search, SearchReset } from '@appStore/actions/search.actions';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { TestActions, getActions } from '../../../../jest-config/test-utils';
import { SearchEffects } from './search.effects';

describe('SearchEffects', () => {
  let effects: SearchEffects;
  let actions$: TestActions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchEffects, { provide: Actions, useFactory: getActions }]
    });

    effects = TestBed.get(SearchEffects);
    actions$ = TestBed.get(Actions);
  });

  it('should return new SearchHeroes', () => {
    const action = new Search('query');
    const completion = new SearchHeroes('query');

    actions$.stream = hot('-(a|)', { a: action });
    const expected = cold('-(b|)', { b: completion });

    expect(effects.search$).toBeObservable(expected);
  });

  it('should return new SearchHeroesReset', () => {
    const action = new SearchReset();
    const completion = new SearchHeroesReset();

    actions$.stream = hot('-(a|)', { a: action });
    const expected = cold('-(b|)', { b: completion });

    expect(effects.reset$).toBeObservable(expected);
  });
});
