import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Store, select } from '@ngrx/store';

import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  first
} from 'rxjs/operators';

import { Hero } from '../../models/hero';

import * as fromHeroReducer from '../../store';
import * as fromHeroSelectors from '../../store/selectors/hero.selectors';

import {
  SearchHeroes,
  SearchHeroesReset
} from '../../store/actions/hero.actions';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSearchComponent implements OnInit, OnDestroy {
  searchTerm$: Observable<string>;
  heroes$: Observable<Hero[]>;

  constructor(private store: Store<fromHeroReducer.State>) {}

  ngOnInit(): void {
    this.heroes$ = this.store.pipe(select(fromHeroSelectors.getSearchHeroes));
    this.searchTerm$ = this.store.pipe(select(fromHeroSelectors.getSearchTerm));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SearchHeroesReset());
  }

  search(term: string): void {
    this.store.dispatch(new SearchHeroes(term));
  }
}
