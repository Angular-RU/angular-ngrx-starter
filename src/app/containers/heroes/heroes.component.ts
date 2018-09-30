import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '@appModels/hero';
import { HeroesService } from '@appServices/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  constructor(private heroesService: HeroesService) {
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
