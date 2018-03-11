import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

import * as fromHeroReducer from '../../store/reducers/hero.reducer';
import * as fromHeroActions from '../../store/actions/hero.actions';
import * as fromHeroSelectors from '../../store/selectors/hero.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  topHeroes$: Observable<Hero[]>;

  constructor(private store: Store<fromHeroReducer.State>) {}

  ngOnInit() {
    this.topHeroes$ = this.store.pipe(select(fromHeroSelectors.getTopHeroes));
  }
}
