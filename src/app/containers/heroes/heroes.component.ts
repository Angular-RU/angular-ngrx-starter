import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Hero } from '@appModels/hero';

import { DeleteHero, AddHero } from '@appStore/actions/hero.actions';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  constructor() {}

  ngOnInit() {
    // this.heroes$ = this.store.pipe(select(fromSelectors.getHeroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    // this.store.dispatch(new AddHero({ name } as Hero));
  }

  delete(hero: Hero): void {
    // this.store.dispatch(new DeleteHero(hero));
  }
}
