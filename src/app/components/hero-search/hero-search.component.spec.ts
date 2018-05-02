import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeroSearchComponent } from './hero-search.component';

describe('HeroSearchComponent', () => {
  let comp: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(() => {
    const storeStub = {
      pipe: () => ({}),
      dispatch: () => ({})
    };
    TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: Store, useValue: storeStub }]
    });
    fixture = TestBed.createComponent(HeroSearchComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'pipe');
      comp.ngOnInit();
      expect(storeStub.pipe).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('makes expected calls', () => {
      const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'dispatch');
      comp.ngOnDestroy();
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });
});
