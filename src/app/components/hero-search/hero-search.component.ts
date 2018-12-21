import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';

import { Observable, Subject, of, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { map, filter, switchMap, debounce, debounceTime } from 'rxjs/operators';

import { Hero } from '@appModels/hero';

import * as fromSelectors from '@appStore/selectors';

import * as fromStore from '@appStore/index';

import { SearchReset, Search } from '@appStore/actions/search.actions';
import { HeroesService } from '@appServices/heroes.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSearchComponent implements OnInit, OnDestroy {
  searchTerm$: Observable<string>;
  heroes$: Observable<Hero[]>;

  constructor(
    private heroesService: HeroesService,
    private store: Store<fromStore.State>
  ) {}

  ngOnInit(): void {
    this.searchTerm$ = this.store.pipe(select(fromSelectors.getSearch));

    this.heroes$ = this.getHeroes();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SearchReset());
  }

  search(term: string): void {
    this.store.dispatch(new Search(term));
  }

  private getHeroes(): Observable<Hero[]> {
    return this.searchTerm$.pipe(
      filter(term => !!(term && term.length > 1)),
      debounceTime(200),
      switchMap(term => this.heroesService.getWithQuery({ name: term }))
    );
  }
}
