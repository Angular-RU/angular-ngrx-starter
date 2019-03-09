import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeroesComponent } from './heroes.component';
import * as fromReducer from '@appStore/reducers';
import { mock, instance, verify, anything, spy, capture } from 'ts-mockito';

describe('HeroesComponent', () => {
  let comp: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let storeMock: Store<fromReducer.hero.State>;
  const mockHero = {
    id: 1,
    name: 'test hero'
  };

  beforeEach(() => {
    storeMock = mock(Store);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: Store, useFactory: () => instance(storeMock) }]
    });
    fixture = TestBed.createComponent(HeroesComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  describe('add', () => {
    it('makes expected calls', () => {
      const addSpy = spy(fixture.debugElement.injector.get(Store));

      comp.add(' test hero ');

      verify(storeMock.dispatch(anything())).once();
      expect(capture(addSpy.dispatch).last()).toMatchSnapshot();
    });

    it('return when name empty', () => {
      comp.add('');

      verify(storeMock.dispatch(anything())).never();
    });
  });

  describe('delete', () => {
    it('makes expected calls', () => {
      const deleteSpy = spy(fixture.debugElement.injector.get(Store));

      comp.delete(mockHero);

      verify(storeMock.dispatch(anything())).once();
      expect(capture(deleteSpy.dispatch).last()).toMatchSnapshot();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      comp.ngOnInit();

      verify(storeMock.pipe(anything())).once();
    });
  });
});
