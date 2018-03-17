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

import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

import * as fromHeroReducer from '../../store/reducers/hero.reducer';
import * as fromHeroActions from '../../store/actions/hero.actions';
import * as fromHeroSelectors from '../../store/selectors/hero.selectors';
import * as fromRouterActions from '../../store/actions/router.actions';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero>;

  constructor(private store: Store<fromHeroReducer.State>) {}

  ngOnInit(): void {
    this.hero$ = this.store.pipe(select(fromHeroSelectors.getHeroById));
  }

  goBack(): void {
    this.store.dispatch(new fromRouterActions.Back());
  }

  save(hero: Hero): void {
    this.store.dispatch(new fromHeroActions.UpdateHero(hero));
  }
}
