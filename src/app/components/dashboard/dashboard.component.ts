import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

import * as fromSelectors from '../../store/selectors';
import * as fromReducers from '../../store/reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  topHeroes$: Observable<Hero[]>;

  constructor(private store: Store<fromReducers.hero.State>) {}

  ngOnInit() {
    this.topHeroes$ = this.store.pipe(select(fromSelectors.getTopHeroes));
  }
}
