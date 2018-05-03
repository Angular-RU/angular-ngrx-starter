import { TestBed } from '@angular/core/testing';
import { HeroService } from '@appServices/hero.service';
import {
  AddHero,
  AddHeroSuccess,
  GetHeroById,
  GetHeroByIdSuccess,
  GetHeroes,
  GetHeroesSuccess,
  HeroError,
  UpdateHero,
  UpdateHeroSuccess,
  DeleteHero,
  DeleteHeroSuccess,
  SearchHeroes,
  SearchHeroesSuccess
} from '@appStore/actions/hero.actions';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { TestActions, getActions } from '../../../../jest-config/test-utils';
import { HeroEffects } from './hero.effects';
import { Go } from '@appStore/actions/router.actions';

describe('HeroEffects', () => {
  let effects: HeroEffects;
  let actions$: TestActions;
  let heroService: HeroService;

  function getHeroService() {
    return {};
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroEffects,
        { provide: Actions, useFactory: getActions },
        { provide: HeroService, useFactory: getHeroService }
      ]
    });

    effects = TestBed.get(HeroEffects);
    actions$ = TestBed.get(Actions);
    heroService = TestBed.get(HeroService);
  });

  describe('get heroes', () => {
    it('should return heroes', () => {
      const heroes = [{ id: 0, name: 'hero0' }, { id: 1, name: 'hero1' }];
      const action = new GetHeroes();
      const result = new GetHeroesSuccess(heroes);

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-a|', { a: heroes });
      const expected = cold('--c', { c: result });
      heroService.getHeroes = jest.fn(() => response);

      expect(effects.loadHeroes$).toBeObservable(expected);
    });

    it('should return heroes error', () => {
      const error = 'error message';
      const action = new GetHeroes();
      const result = new HeroError(error);

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: result });
      heroService.getHeroes = jest.fn(() => response);

      expect(effects.loadHeroes$).toBeObservable(expected);
    });
  });

  describe('get hero by id', () => {
    it('should get hero by id', () => {
      const hero = { id: 0, name: 'hero0' };
      const action = new GetHeroById(0);
      const result = new GetHeroByIdSuccess(hero);

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-a|', { a: hero });
      const expected = cold('--b', { b: result });
      heroService.getHero = jest.fn(() => response);

      expect(effects.getHeroById$).toBeObservable(expected);
    });

    it('should get hero by id error', () => {
      const error = 'error message';
      const action = new GetHeroById(0);
      const result = new HeroError(error);

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: result });
      heroService.getHero = jest.fn(() => response);

      expect(effects.getHeroById$).toBeObservable(expected);
    });
  });

  describe('add hero', () => {
    it('should add hero', () => {
      const newHero = { id: 5, name: 'new hero' };
      const action = new AddHero(newHero);
      const result = new AddHeroSuccess(newHero);

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-a|', { a: newHero });
      const expected = cold('--b', { b: result });
      heroService.addHero = jest.fn(() => response);

      expect(effects.addHero$).toBeObservable(expected);
    });

    it('should add hero error', () => {
      const newHero = { id: 5, name: 'new hero' };
      const error = 'error message';
      const action = new AddHero(newHero);
      const result = new HeroError(error);

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: result });
      heroService.addHero = jest.fn(() => response);

      expect(effects.addHero$).toBeObservable(expected);
    });
  });

  describe('update hero', () => {
    it('should update hero', () => {
      const hero = { id: 3, name: 'hero' };
      const action = new UpdateHero(hero);
      const result = new UpdateHeroSuccess(hero);

      actions$.stream = hot('-a----', { a: action });
      const response = cold('-a|', { a: hero });
      const expected = cold('--b', { b: result });
      heroService.updateHero = jest.fn(() => response);

      expect(effects.updateHero$).toBeObservable(expected);
    });

    it('should update hero error', () => {
      const hero = { id: 3, name: 'hero' };
      const error = 'error message';
      const action = new UpdateHero(hero);
      const result = new HeroError(error);

      actions$.stream = hot('-a----', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: result });
      heroService.updateHero = jest.fn(() => response);

      expect(effects.updateHero$).toBeObservable(expected);
    });
  });

  describe('delete hero', () => {
    it('should delete hero', () => {
      const hero = { id: 7, name: 'delete hero' };
      const action = new DeleteHero(hero);
      const result = new DeleteHeroSuccess(hero);

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-a|', { a: hero });
      const expected = cold('--b', { b: result });
      heroService.deleteHero = jest.fn(() => response);

      expect(effects.deleteHero$).toBeObservable(expected);
    });

    it('should delete hero error', () => {
      const hero = { id: 7, name: 'delete hero' };
      const error = 'error message';
      const action = new DeleteHero(hero);
      const result = new HeroError(error);

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: result });
      heroService.deleteHero = jest.fn(() => response);

      expect(effects.deleteHero$).toBeObservable(expected);
    });
  });

  describe('search heroes', () => {
    it('should search heroes success', () => {
      const heroes = [
        { id: 25, name: 'search hero' },
        { id: 32, name: 'search hero 2' }
      ];
      const action = new SearchHeroes('search');
      const result = new SearchHeroesSuccess(heroes);

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-a|', { a: heroes });
      const expected = cold('--b', { b: result });
      heroService.searchHeroes = jest.fn(() => response);

      expect(effects.searchHeroes$).toBeObservable(expected);
    });

    it('should search heroes error', () => {
      const error = 'error message';
      const action = new SearchHeroes('search');
      const result = new HeroError(error);

      actions$.stream = hot('-a---', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--b', { b: result });
      heroService.searchHeroes = jest.fn(() => response);

      expect(effects.searchHeroes$).toBeObservable(expected);
    });
  });

  describe('update hero success', () => {
    it('should navigate to heroes', () => {
      const action = new UpdateHeroSuccess({ id: 555, name: 'update hero' });
      const result = new Go({ path: ['/heroes'] });

      actions$.stream = hot('-a---', { a: action });
      const expected = cold('-b', { b: result });

      expect(effects.updateHeroSuccess$).toBeObservable(expected);
    });
  });
});
