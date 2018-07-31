import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '@appModels/hero';
import { EntityServices, EntityCollectionService } from 'ngrx-data';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  heroesService: EntityCollectionService<Hero>;

  constructor(entityServices: EntityServices) {
    this.heroesService = entityServices.getEntityCollectionService('Hero');
  }

  ngOnInit() {
    this.heroes$ = this.heroesService.entities$;
  }

  add(name: string): void {
    if (!name) {
      return;
    }

    name = name.trim();
    this.heroesService.add({ name } as Hero);
  }

  delete(hero: Hero): void {
    this.heroesService.delete(hero);
  }
}
