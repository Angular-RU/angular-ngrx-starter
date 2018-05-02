import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { Hero } from '@appModels/hero';
import { HeroService } from '@appServices/hero.service';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducer from '@appStore/reducers';

import { Back } from '@appStore/actions/router.actions';
import { UpdateHero } from '@appStore/actions/hero.actions';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero>;

  constructor(private store: Store<fromReducer.hero.State>) {}

  ngOnInit(): void {
    this.hero$ = this.store.pipe(select(fromSelectors.getHeroById));
  }

  goBack(): void {
    this.store.dispatch(new Back());
  }

  save(hero: Hero, heroName: string): void {
    this.store.dispatch(new UpdateHero({ ...hero, name: heroName }));
  }
}
