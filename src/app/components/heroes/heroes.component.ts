import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { Hero } from '../../models/hero';

import * as fromHeroReducer from '../../store/reducers/hero.reducer';
import * as fromHeroActions from '../../store/actions/hero.actions';
import * as fromHeroSelectors from '../../store/selectors/hero.selectors';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  constructor(private store: Store<fromHeroReducer.State>) {}

  ngOnInit() {
    this.heroes$ = this.store.pipe(select(fromHeroSelectors.getHeroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.store.dispatch(new fromHeroActions.HeroAddHero({ name } as Hero));
  }

  delete(hero: Hero): void {
    this.store.dispatch(new fromHeroActions.HeroDeleteHero(hero));
  }
}
