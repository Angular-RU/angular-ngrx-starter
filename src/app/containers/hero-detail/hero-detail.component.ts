import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Hero } from '@appModels/hero';

import * as fromStore from '@appStore/index';

import { Back } from '@appStore/actions/router.actions';
import { HeroesService } from '@appServices/heroes.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero>;

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    private store: Store<fromStore.State>
  ) {}

  ngOnInit(): void {
    this.hero$ = this.heroesService.getByKey(this.route.snapshot.params['id']);
  }

  goBack(): void {
    this.store.dispatch(new Back());
  }

  save(hero: Hero, name: string): void {
    this.heroesService
      .update({ ...hero, name })
      .pipe(first())
      .subscribe(() => this.goBack());
  }
}
