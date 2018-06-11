import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';

import { Observable ,  Subject ,  of } from 'rxjs';
import { Store, select } from '@ngrx/store';

import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  first
} from 'rxjs/operators';

import { Hero } from '@appModels/hero';

import * as fromSelectors from '@appStore/selectors';

import * as fromStore from '@appStore/index';

import {
  SearchHeroes,
  SearchHeroesReset
} from '@appStore/actions/hero.actions';
import { SearchReset, Search } from '@appStore/actions/search.actions';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSearchComponent implements OnInit, OnDestroy {
  searchTerm$: Observable<string>;
  heroes$: Observable<Hero[]>;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit(): void {
    this.heroes$ = this.store.pipe(select(fromSelectors.getSearchHeroes));
    this.searchTerm$ = this.store.pipe(select(fromSelectors.getSearch));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SearchReset());
  }

  search(term: string): void {
    this.store.dispatch(new Search(term));
  }
}
