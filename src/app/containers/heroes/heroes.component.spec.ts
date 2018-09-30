import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { Hero } from '@appModels/hero';
import { HeroesComponent } from './heroes.component';
import { HeroesService } from '@appServices/heroes.service';

describe('HeroesComponent', () => {
  let comp: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroesService: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: HeroesService, useValue: {} }]
    });

    heroesService = TestBed.get(HeroesService);

    fixture = TestBed.createComponent(HeroesComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  describe('add', () => {
    it('makes expected calls', () => {
      heroesService.add = jest.fn();

      comp.add('test');
      expect(heroesService.add).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('makes expected calls', () => {
      const mockHero = { id: 1, name: 'test' };
      heroesService.delete = jest.fn();

      comp.delete(mockHero);
      expect(heroesService.delete).toHaveBeenCalledTimes(1);
    });
  });
});
