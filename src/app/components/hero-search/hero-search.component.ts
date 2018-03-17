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

import * as fromSelectors from '../../store/selectors';

import * as fromStore from '../../store';

import {
  SearchHeroes,
  SearchHeroesReset
} from '../../store/actions/hero.actions';
import { SearchReset, Search } from '../../store/actions/search.actions';

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
