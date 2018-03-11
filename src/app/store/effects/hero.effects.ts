import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HeroActionTypes, HeroGetSuccess, HeroError } from '../actions/hero.actions';
import { HeroService } from '../../services/hero.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HeroEffects {
  constructor(private actions$: Actions, private heroService: HeroService) {}

  @Effect()
  loadHeroes$ = this.actions$
    .ofType(HeroActionTypes.heroGet)
    .pipe(
      switchMap(() => this.heroService.getHeroes()),
      map(heroes => new HeroGetSuccess(heroes), 
      catchError(error => of(new HeroError(error))))
    );
}
