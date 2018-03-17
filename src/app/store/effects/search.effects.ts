import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SearchActionTypes, Search } from '../actions/search.actions';
import { map, debounceTime } from 'rxjs/operators';
import { SearchHeroes, SearchHeroesReset } from '../actions/hero.actions';

@Injectable()
export class SearchEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  search$ = this.actions$.pipe(
    ofType(SearchActionTypes.Search),
    debounceTime(300),
    map((action: Search) => new SearchHeroes(action.payload))
  );

  @Effect()
  reset$ = this.actions$.pipe(
    ofType(SearchActionTypes.SearchReset),
    debounceTime(300),
    map(() => new SearchHeroesReset())
  );
}
