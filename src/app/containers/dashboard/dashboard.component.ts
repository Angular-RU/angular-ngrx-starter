import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Hero } from '@appModels/hero';

import { map } from 'rxjs/operators';
import { HeroesService } from '@appServices/heroes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  constructor(private heroesService: HeroesService) {}

  ngOnInit() {
    this.heroes$ = this.heroesService.entities$.pipe(map(e => e.slice(0, 4)));
  }
}
