import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { SearchEffects } from './search.effects';
import { Search, SearchReset } from '@appStore/actions/search.actions';
import {
  SearchHeroes,
  SearchHeroesReset
} from '@appStore/actions/hero.actions';
import { Hero } from '@appModels/hero';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { operators } from 'rxjs';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

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
