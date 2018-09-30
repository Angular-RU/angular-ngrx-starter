import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeroSearchComponent } from './hero-search.component';
import { of } from 'rxjs';
import { HeroesService } from '@appServices/heroes.service';

describe('HeroSearchComponent', () => {
  let comp: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroesService: HeroesService;

  beforeEach(() => {
    const storeStub = {
      pipe: jest.fn(),
      dispatch: jest.fn()
    };
    TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: storeStub },
        { provide: HeroesService, useValue: {} }
      ]
    });

    heroesService = TestBed.get(HeroesService);

    fixture = TestBed.createComponent(HeroSearchComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      storeStub.pipe = jest.fn().mockReturnValue(of());
      comp.ngOnInit();

      expect(storeStub.pipe).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('makes expected calls', () => {
      const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      storeStub.pipe = jest.fn().mockReturnValue(of());

      comp.ngOnDestroy();
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });
});
