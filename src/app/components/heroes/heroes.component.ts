import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

import * as fromHeroReducer from '../../store/reducers/hero.reducer';
import * as fromHeroActions from '../../store/actions/hero.actions';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService, private store: Store<fromHeroReducer.State>) {}

  ngOnInit() {
    this.getHeroes();
    this.store.pipe(select('hero')).subscribe(hero => console.log(hero));
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.store.dispatch(new fromHeroActions.HeroGetSuccess(heroes));
      this.heroes = heroes;
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
