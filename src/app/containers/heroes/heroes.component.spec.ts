import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { Hero } from '@appModels/hero';
import { HeroesComponent } from './heroes.component';
import { EntityServices, EntityCollectionService } from 'ngrx-data';

describe('HeroesComponent', () => {
  let comp: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let entityServices: EntityServices;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: EntityServices, useValue: {} }]
    });

    entityServices = TestBed.get(EntityServices);
    entityServices.getEntityCollectionService = jest.fn().mockReturnValue({});

    fixture = TestBed.createComponent(HeroesComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  describe('add', () => {
    it('makes expected calls', () => {
      comp.heroesService.add = jest.fn();

      comp.add('test');
      expect(comp.heroesService.add).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('makes expected calls', () => {
      const mockHero = { id: 1, name: 'test' };
      comp.heroesService.delete = jest.fn();

      comp.delete(mockHero);
      expect(comp.heroesService.delete).toHaveBeenCalledTimes(1);
    });
  });
});
