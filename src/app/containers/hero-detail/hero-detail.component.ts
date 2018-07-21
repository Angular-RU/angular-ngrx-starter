import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Hero } from '@appModels/hero';

import * as fromStore from '@appStore/index';

import { Back } from '@appStore/actions/router.actions';
import { EntityCollectionService, EntityServices } from 'ngrx-data';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnInit {
  hero$: Observable<Hero>;
  heroesService: EntityCollectionService<Hero>;

  constructor(
    entityServices: EntityServices,
    private route: ActivatedRoute,
    private store: Store<fromStore.State>
  ) {
    this.heroesService = entityServices.getEntityCollectionService('Hero');
  }

  ngOnInit(): void {
    this.hero$ = this.heroesService.getByKey(this.route.snapshot.params['id']);
  }

  goBack(): void {
    this.store.dispatch(new Back());
  }

  save(hero: Hero, name: string): void {
    this.heroesService.update({ ...hero, name });
  }
}
