import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';

import { Observable, Subject, of, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { map } from 'rxjs/operators';

import { Hero } from '@appModels/hero';

import * as fromSelectors from '@appStore/selectors';

import * as fromStore from '@appStore/index';

import {
  SearchHeroes,
  SearchHeroesReset
} from '@appStore/actions/hero.actions';
import { SearchReset, Search } from '@appStore/actions/search.actions';
import { EntityCollectionService, EntityServices } from 'ngrx-data';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSearchComponent implements OnInit, OnDestroy {
  searchTerm$: Observable<string>;
  heroes$: Observable<Hero[]>;
  heroesService: EntityCollectionService<Hero>;

  constructor(
    entityServices: EntityServices,
    private store: Store<fromStore.State>
  ) {
    this.heroesService = entityServices.getEntityCollectionService('Hero');
  }

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
    return combineLatest(this.heroesService.getAll(), this.searchTerm$).pipe(
      map(([heroes, term]) => {
        if (!term || !term.length) {
          return [];
        }

        return heroes.filter(h =>
          h.name.toLowerCase().includes(term.toLowerCase())
        );
      })
    );
  }
}
