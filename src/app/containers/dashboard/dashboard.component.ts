import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Hero } from '@appModels/hero';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducer from '@appStore/reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  topHeroes$: Observable<Hero[]>;

  constructor(private store: Store<fromReducer.hero.State>) {}

  ngOnInit() {
    this.topHeroes$ = this.store.pipe(select(fromSelectors.getTopHeroes));
  }
}
