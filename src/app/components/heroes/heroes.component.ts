import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

import * as fromHeroReducer from '../../store/reducers/hero.reducer';
import * as fromHeroActions from '../../store/actions/hero.actions';
import * as fromHeroSelectors from '../../store/selectors/hero.selectors';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  constructor(
    private heroService: HeroService,
    private store: Store<fromHeroReducer.State>
  ) {}

  ngOnInit() {
    this.heroes$ = this.store.pipe(select(fromHeroSelectors.getHeroes));
    this.store.dispatch(new fromHeroActions.HeroGet());
  }

  add(name: string): void {
    //   name = name.trim();
    //   if (!name) {
    //     return;
    //   }
    //   this.heroService.addHero({ name } as Hero).subscribe(hero => {
    //     this.heroes.push(hero);
    //   });
  }

  delete(hero: Hero): void {
    //   this.heroes = this.heroes.filter(h => h !== hero);
    //   this.heroService.deleteHero(hero).subscribe();
  }
}
