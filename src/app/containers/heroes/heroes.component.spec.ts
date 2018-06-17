import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { Hero } from '@appModels/hero';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let comp: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(() => {
    const storeStub = {
      pipe: () => ({}),
      dispatch: () => ({})
    };
    const heroStub = {};
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: storeStub },
        { provide: Hero, useValue: heroStub }
      ]
    });
    fixture = TestBed.createComponent(HeroesComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  describe('delete', () => {
    it('makes expected calls', () => {
      const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      const heroStub: Hero = fixture.debugElement.injector.get(Hero);
      spyOn(storeStub, 'dispatch');
      comp.delete(heroStub);
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'pipe');
      comp.ngOnInit();
      expect(storeStub.pipe).toHaveBeenCalled();
    });
  });
});
